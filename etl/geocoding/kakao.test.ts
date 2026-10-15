import assert from 'node:assert/strict';
import test from 'node:test';
import {geocodeAddress} from './kakao';
test('Kakao failures and malformed coordinate pairs fail visibly using mocked fetch only',async()=>{
 const fetchBefore=globalThis.fetch;const keyBefore=process.env.KAKAO_REST_API_KEY;process.env.KAKAO_REST_API_KEY='fixture-not-a-real-key';let calls=0;
 try{
  for(const status of [401,403,429,500]){
   globalThis.fetch=async()=>{calls++;return new Response('',{status})};
   await assert.rejects(geocodeAddress('합성 주소'),new RegExp(`HTTP ${status}`));
  }
  for(const [y,x] of [['NaN','127'],['37',''],['91','127'],['37','181']]){
   globalThis.fetch=async()=>{calls++;return Response.json({documents:[{y,x}]})};
   await assert.rejects(geocodeAddress('합성 주소'),/좌표/);
  }
  globalThis.fetch=async()=>Response.json({documents:[{y:'37',x:'127'}]});
  assert.deepEqual(await geocodeAddress('합성 주소'),{lat:37,lng:127});assert.equal(calls,8);
 }finally{globalThis.fetch=fetchBefore;if(keyBefore===undefined)delete process.env.KAKAO_REST_API_KEY;else process.env.KAKAO_REST_API_KEY=keyBefore;}
});
