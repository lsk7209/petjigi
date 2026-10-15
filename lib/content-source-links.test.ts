import assert from 'node:assert/strict';
import test from 'node:test';
import {sourceLinkParts} from './content-sources';
test('source URL is linked while prose and unsafe schemes remain plain text',()=>{
 assert.deepEqual(sourceLinkParts('https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=1 — 법령'),{before:'',href:'https://www.law.go.kr/LSW/lsInfoP.do?lsiSeq=1',after:' — 법령'});
 assert.equal(sourceLinkParts('출처 이름만 있음').href,null);
 assert.equal(sourceLinkParts('javascript:alert(1)').href,null);
 assert.equal(sourceLinkParts('https://user:secret@example.org/path').href,null);
});
