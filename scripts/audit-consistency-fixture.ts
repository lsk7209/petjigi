import fs from 'node:fs';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { and, eq, sql } from 'drizzle-orm';
import { businesses } from '../db/schema/businesses';
import { businessRegionCondition } from '../lib/business-region';
import { listingSitemapSql, notDuplicateListingSql, collapseListingDuplicates, hasListingStatusConflict } from '../lib/listing-identity';
import { evaluateListingEligibility } from '../lib/seo/indexability-policy';
import { classifyListing } from '../lib/listing-state';
import { getPageWindow } from '../lib/business-listing';

type Row={id:string;name:string;address:string|null;status?:string;sido?:string;lastSyncedAt?:string};
const fixtures:{name:string;rows:Row[];ambiguous?:boolean;regionSido?:string}[]=[
 ...[0,1,2,3,51].map(n=>({name:`unique-${n}`,rows:Array.from({length:n},(_,i)=>({id:String(i),name:`업체${i}`,address:`서울  ${i}`}))})),
 {name:'two-businesses-four-source-rows',rows:[{id:'a1',name:'가',address:'서울 1'},{id:'a2',name:'가',address:'서울 1'},{id:'b1',name:'나',address:'서울 2'},{id:'b2',name:'나',address:'서울 2'}]},
 {name:'same-name-different-address',rows:[{id:'a',name:'가',address:'서울 1'},{id:'b',name:'가',address:'서울 2'}]},
 {name:'unknown-addresses',rows:[null,'','*'].flatMap((address,i)=>[{id:`${i}a`,name:`가${i}`,address},{id:`${i}b`,name:`가${i}`,address}])},
 {name:'small-id-is-older',rows:[{id:'a',name:'가',address:'서울 1',lastSyncedAt:'2026-05-01'},{id:'z',name:'가',address:'서울 1',lastSyncedAt:'2026-10-13'}]},
 {name:'active-closed-conflict',rows:[{id:'a',name:'가',address:'서울 1',status:'active'},{id:'c',name:'가',address:'서울 1',status:'closed'}]},
 {name:'ambiguous-region-three',ambiguous:true,rows:Array.from({length:3},(_,i)=>({id:String(i),name:`가${i}`,address:`서울 ${i}`}))},
 ...[2,3].map(n=>({name:`merged-evidenced-${n}-plus-unmapped`,regionSido:'전라남도',rows:[...Array.from({length:n},(_,i)=>[
  {id:`${i}-old`,name:`가${i}`,address:`전라남도 테스트구 ${i}`,sido:'전라남도',lastSyncedAt:'2026-05-01'},
  {id:`${i}-new`,name:`가${i}`,address:`전남광주통합특별시 테스트구 ${i}`,sido:'전남광주통합특별시',lastSyncedAt:'2026-10-13'},
 ]).flat(),{id:'unmapped',name:'미매핑',address:'전남광주통합특별시 테스트구 9',sido:'전남광주통합특별시'}]})),
];
async function main(){
 const results=[];
 for(const f of fixtures){
 const c=createClient({url:':memory:'});
 try{
 await c.execute('CREATE TABLE businesses(id TEXT,type TEXT,name TEXT,address TEXT,status TEXT,last_synced_at TEXT,address_sido TEXT,address_sigungu TEXT)');
 await c.execute('CREATE TABLE regions(sido TEXT,sigungu TEXT,sigungu_slug TEXT)');
 await c.execute({sql:'INSERT INTO regions VALUES (?,?,?)',args:[f.regionSido??'서울특별시','테스트구','test']});
 if(f.ambiguous)await c.execute("INSERT INTO regions VALUES ('부산광역시','테스트구','test')");
 for(const r of f.rows)await c.execute({sql:'INSERT INTO businesses VALUES (?,?,?,?,?,?,?,?)',args:[r.id,'vet',r.name,r.address,r.status??'active',r.lastSyncedAt??'2026-10-13',r.sido??f.regionSido??'서울특별시','테스트구']});
 const db=drizzle(c);
 const scope=and(businessRegionCondition('테스트구',f.ambiguous?null:f.regionSido??'서울특별시'),eq(businesses.status,'active'),sql.raw(notDuplicateListingSql('businesses')));
 const selected=await db.select({id:businesses.id}).from(businesses).where(scope);
 const cards=await db.select({id:businesses.id}).from(businesses).where(scope).limit(50);
 const countRow=await db.select({n:sql<number>`count(*)`}).from(businesses).where(scope).get();
 const sitemap=(await c.execute({sql:listingSitemapSql(),args:[3]})).rows.length>0;
 const eligibility=evaluateListingEligibility({ambiguousRegion:!!f.ambiguous,status:classifyListing(selected.length,'2026-10-13'),businessCount:selected.length,categoryId:3});
 const original=f.rows.map(r=>({...r,type:'vet',status:r.status??'active',lastSyncedAt:r.lastSyncedAt??'2026-10-13'}));
 results.push({fixture:f.name,scope:'synthetic SQLite only',rawRows:f.rows.length,uniqueActive:selected.length,firstPageCards:cards.length,scopedCountQuery:countRow?.n,fullRouteComparison:"covered by browser fixture separately; not production",pageWindow:getPageWindow(selected.length,1,50),selectedIds:selected.map(r=>r.id),jsGlobalUniqueActive:collapseListingDuplicates(original).filter(r=>r.status==='active').length,statusConflict:original.some(r=>hasListingStatusConflict(original,r)),originalDataDate:'UNKNOWN',collectionTimes:[...new Set(original.map(r=>r.lastSyncedAt))],eligibility,sitemapIncluded:sitemap,mismatch:eligibility.sitemapEligible!==sitemap});
 }finally{c.close();}}
 const report={at:new Date().toISOString(),production:{status:'BLOCKED',reason:'project DB credentials unavailable',rawRows:null,uniqueActive:null,conflicts:null,unclassified:null},results};
 fs.writeFileSync('docs/audits/final-consistency-20261016.json',JSON.stringify(report,null,2));
 console.log({fixtures:results.length,mismatches:results.filter(r=>r.mismatch).length});
 if(results.some(r=>r.mismatch))process.exitCode=1;
}
void main();
