const puppeteer = require('puppeteer');
const testPage = require('./testPage');
const logger=require('./logger');

(async () => {
  let url="https://hotsoon.snssdk.com/magic/runtime/?id=3260";
  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  logger(await testPage(page,url),"json");
 // console.log(await testPage(page)); // first enter
 // console.log(await testPage(page)); // second enter with cache and sw
  await browser.close();

  // browser = await puppeteer.launch();
  // page = await browser.newPage();
  // await testPage(page); // only for creating fresh instance
  // await page._client.send('ServiceWorker.enable');
  // await page._client.send('ServiceWorker.stopAllWorkers');
  // console.log(await testPage(page)); // second enter only with cache
  // await browser.close();

  // browser = await puppeteer.launch();
  // page = await browser.newPage();
  // await testPage(page); // only for creating fresh instance
  // await page._client.send('Network.clearBrowserCache');
  // console.log(await testPage(page)); // second enter only with sw
  // await browser.close();
})();