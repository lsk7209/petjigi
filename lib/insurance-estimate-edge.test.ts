import assert from 'node:assert/strict';
import test from 'node:test';
import {estimateInsurancePayout} from './insurance-estimate';
const v={cost:'10000',rate:'80',fixed:'1000',cap:'100000'};
for(const bad of ['1.5','9007199254740992','1e20','-1','abc',''])test(`won amount ${bad} rejects instead of rounding unsafe input`,()=>assert.equal(estimateInsurancePayout({...v,cost:bad}),null));
test('zero won and fractional percentage remain valid',()=>{
 assert.equal(estimateInsurancePayout({...v,cost:'0'}),0);
 assert.equal(estimateInsurancePayout({...v,rate:'80.5'}),7245);
});
