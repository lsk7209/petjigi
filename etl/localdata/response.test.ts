import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import ts from 'typescript';
import {runInNewContext} from 'node:vm';
function load(json:unknown,status=200){
 const src=ts.createSourceFile('sync.ts',fs.readFileSync('etl/localdata/sync.ts','utf8'),ts.ScriptTarget.Latest,true);
 const fn=src.statements.find(s=>ts.isFunctionDeclaration(s)&&s.name?.text==='fetchLocaldataPage');assert.ok(fn);
 const code=ts.transpileModule(fn.getText(src)+'\nexports.fetchPage=fetchLocaldataPage;', {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 const exports:{fetchPage?:(type:string,page:number)=>Promise<unknown>}={};runInNewContext(code,{exports,LOCALDATA_KEY:'fixture-only',AbortSignal,fetch:async()=>Response.json(json,{status})});return exports.fetchPage!;
}
for(const json of [{},{result:{}},{result:{body:{}}},{result:{body:{items:'bad'}}}])test('malformed LOCALDATA response is not a genuine empty snapshot',async()=>{
 await assert.rejects(load(json)('01',1));
});
test('explicit empty LOCALDATA array remains valid',async()=>{
 assert.equal((await load({result:{body:{items:[]}}})('01',1) as unknown[]).length,0);
});
for(const status of [401,403,429,500])test(`LOCALDATA HTTP ${status} remains failure`,async()=>{await assert.rejects(load({},status)('01',1));});
