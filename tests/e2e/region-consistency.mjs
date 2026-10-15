import assert from 'node:assert/strict';
import fs from 'node:fs';
import {launch,startServer} from './server.mjs';
const {base,server}=await startServer(3196);
try{
 const browser=await launch();
 try{
  const page=await browser.newPage();
  await page.route(u=>u.origin!==base,r=>r.fulfill({status:200,body:''}));
  assert.equal((await page.goto(base+'/mokpo/vet')).status(),200);
  assert.equal(await page.locator('main a[href^="/vet/mokpo/"]').count(),3);
  assert.doesNotMatch((await page.locator('meta[name="robots"]').first().getAttribute('content'))??'',/noindex/);
  await page.goto(base+'/tools/region-compare/vet');
  const row=page.locator('tr').filter({has:page.locator('th').filter({hasText:/^목포시$/})});
  assert.equal(await row.count(),1);
  assert.equal((await row.locator('td').first().innerText()).trim(),'3곳');
  assert.equal(await row.locator('a').getAttribute('href'),'/mokpo/vet');
  assert.match(await page.locator('main').innerText(),/표에서 제외한 업체가 1곳/);
  await page.goto(base+'/vet/mokpo/'+encodeURIComponent('합성목포1'));
  assert.match(await page.locator('section[aria-label="지역 현황"]').innerText(),/3개/);
  fs.writeFileSync('docs/audits/final-route-consistency-20261016.json',JSON.stringify({at:new Date().toISOString(),scope:'isolated fixture production build and browser, not live production',listingCards:3,comparisonCount:3,detailRegionCount:3,unclassifiedCount:1,mismatches:0,externalRequests:'mocked'},null,2));
  console.log('region-consistency: listing 3 cards, comparison 3, detail 3, unclassified 1 PASS');
 }finally{await browser.close();}
}finally{server.kill();}
