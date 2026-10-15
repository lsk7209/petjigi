import assert from 'node:assert/strict';
import test from 'node:test';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { businesses } from '../db/schema/businesses';
import { businessRegionCondition } from './business-region';
import { splitUnclassified } from './region-compare';

test('resolved region excludes same-name districts in other provinces; renamed province remains included', async () => {
 const client = createClient({url: ':memory:'});
 try {
  await client.execute('CREATE TABLE businesses (id TEXT, address_sido TEXT, address_sigungu TEXT, address TEXT, type TEXT, name TEXT)');
  for (const [id,sido,sigungu] of [['s','서울특별시','강서구'],['b','부산광역시','강서구'],['g','경기도','광주시'],['j','광주광역시','광주시'],['old','강원도','춘천시'],['new','강원특별자치도','춘천시']])
   await client.execute({sql:'INSERT INTO businesses (id,address_sido,address_sigungu) VALUES (?,?,?)',args:[id,sido,sigungu]});
  const db = drizzle(client);
  const ids = async (name: string, sido: string|null) => (await db.select({id:businesses.id}).from(businesses).where(businessRegionCondition(name,sido))).map(r=>r.id).sort();
  assert.deepEqual(await ids('강서구','서울특별시'),['s']);
  assert.deepEqual(await ids('강서구',null),['b','s']); // existing ambiguous combined view retained
  assert.deepEqual(await ids('광주시','경기도'),['g']);
  assert.deepEqual(await ids('춘천시','강원특별자치도'),['new','old']);
 } finally {client.close();}
});

test('administrative-looking unverified region is unclassified rather than invented', () => {
 const row = {sido:'경기도',sigungu:'존재미확인구',sigunguSlug:null,count:2,phoneCount:0};
 assert.equal(splitUnclassified([row]).unclassified.count,2);
});
test('merged province representative remains reachable only through evidenced legacy business row',async()=>{
 const client=createClient({url:':memory:'});
 try{
 await client.execute('CREATE TABLE businesses (id TEXT,type TEXT,name TEXT,address TEXT,address_sido TEXT,address_sigungu TEXT,status TEXT,last_synced_at TEXT)');
 await client.execute("INSERT INTO businesses VALUES ('old','vet','가','전라남도 목포시 1','전라남도','목포시','active','2026-05-01'),('new','vet','가','전남광주통합특별시 목포시 1','전남광주통합특별시','목포시','active','2026-10-13'),('unmapped','vet','나','전남광주통합특별시 목포시 2','전남광주통합특별시','목포시','active','2026-10-13')");
 const db=drizzle(client);
 const rows=await db.select({id:businesses.id}).from(businesses).where(businessRegionCondition('목포시','전라남도'));
 assert.deepEqual(rows.map(r=>r.id).sort(),['new','old']);
 }finally{client.close();}
});
