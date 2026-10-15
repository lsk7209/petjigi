import assert from 'node:assert/strict';
import test from 'node:test';
import { collectApmsPages } from './apms-collection';
import type { ApmsParseResult } from './apms-response';
type Row={id:string};
const ok=(ids:string[],totalCount:number):ApmsParseResult<Row>=>({kind:'ok',items:ids.map(id=>({id})),totalCount});
const collect=(pages:ApmsParseResult<Row>[])=>collectApmsPages(async p=>pages[p-1],r=>r.id,2);
test('complete and genuine zero source snapshots are distinct from failures',async()=>{
 assert.equal((await collect([ok(['a','b'],3),ok(['c'],3)])).length,3);
 assert.deepEqual(await collect([ok([],0)]),[]);
});
for(const status of [401,403,429,500])test(`HTTP ${status} cannot yield a complete snapshot`,async()=>{
 await assert.rejects(collect([ok(['a','b'],3),{kind:'failed',reason:`HTTP ${status}`}]),/APMS page 2/);
});
test('timeout rejects without returning a partial snapshot',async()=>{
 await assert.rejects(collectApmsPages(async()=>{throw new Error('timeout')},r=>String(r)),/timeout/);
});
test('short final page, missing page, changing total and repeated source page reject',async()=>{
 for(const pages of [[ok(['a','b'],4),ok(['c'],4)],[ok(['a','b'],3),ok([],3)],[ok(['a','b'],3),ok(['c'],4)],[ok(['a','b'],4),ok(['a','b'],4)]])await assert.rejects(collect(pages));
});
