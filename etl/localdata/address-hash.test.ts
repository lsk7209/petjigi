import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import ts from 'typescript';
import {createHash} from 'node:crypto';
import {runInNewContext} from 'node:vm';
test('LOCALDATA hashes effective fallback address before deciding to skip a row',()=>{
 const src=ts.createSourceFile('sync.ts',fs.readFileSync('etl/localdata/sync.ts','utf8'),ts.ScriptTarget.Latest,true);
 const fn=src.statements.find(s=>ts.isFunctionDeclaration(s)&&s.name?.text==='hashRow');assert.ok(fn);
 const code=ts.transpileModule(fn.getText(src)+'\nexports.hashRow=hashRow;', {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 const exports:{hashRow?:(r:unknown)=>string}={};runInNewContext(code,{exports,createHash});
 const base={bplcNm:'합성',rdnWhlAddr:'',siteWhlAddr:'서울 1',siteTel:'',dtlStateGbn:'01'};
 assert.notEqual(exports.hashRow!(base),exports.hashRow!({...base,siteWhlAddr:'서울 2'}));
 assert.equal(exports.hashRow!({...base,rdnWhlAddr:'도로 1'}),exports.hashRow!({...base,rdnWhlAddr:'도로 1',siteWhlAddr:'서울 2'}));
});
