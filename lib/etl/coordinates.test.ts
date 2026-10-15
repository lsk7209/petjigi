import assert from 'node:assert/strict';
import test from 'node:test';
import { retainedCoordinates, validCoordinates } from './coordinates';
test('address changes and half-pairs cannot reuse old map coordinates',()=>{
 const old={address:'서울 1',lat:37,lng:127};
 assert.deepEqual(retainedCoordinates(old,'서울 1'),{lat:37,lng:127});
 assert.deepEqual(retainedCoordinates(old,'서울 2'),{lat:null,lng:null});
 assert.deepEqual(retainedCoordinates({...old,lng:null},'서울 1'),{lat:null,lng:null});
 for(const [lat,lng] of [[NaN,127],[37,Infinity],[91,127],[37,181]])assert.equal(validCoordinates(lat,lng),false);
});
