const {
    getTimeFromPerformanceMetrics,
    extractDataFromTracing,
  } = require('./helper');
  
  async function testPage(page,url) {
    await page.tracing.start({ path: './trace.json' });
    await page.goto(url);
    await page.tracing.stop();
    const fileTracing = await extractDataFromTracing(
      './trace.json',
    );
    const performanceTiming = JSON.parse(
      await page.evaluate(() => JSON.stringify(window.performance.timing))
  );
  console.log(performanceTiming);

  
    const performanceMetrics = await page._client.send('Performance.getMetrics');
    const navigationStart = getTimeFromPerformanceMetrics(
      performanceMetrics,
      'NavigationStart'
    );
    let jsFile=[];
    let cssFile=[];
    let image=[];
    let sladarAndTEA=[];
    let other=[];
    for(let info of fileTracing){
      let fileStart=info.resourceTracingStartTime- navigationStart;
      let fileEnd=info.resourceTracingEndTime-navigationStart;
      info.time=fileEnd-fileStart;
      delete info.resourceTracingStartTime;
      delete info.resourceTracingEndTime;
      if(info.url.endsWith(".css")){
        cssFile.push(info);
      }else      if(info.url.endsWith(".js")){
        jsFile.push(info);
      }else
      if(info.url.endsWith(".jpg")||info.url.endsWith(".jpeg")||info.url.indexOf(".image?")!=-1||info.url.indexOf("data:image/png;base64,")!=-1){
        image.push(info);
      }else
      if(info.url.indexOf("/slardar/")!=-1||info.url.indexOf("list?rdn")!=-1){
        sladarAndTEA.push(info);
      }else{
        other.push(info);
      }
    }
    let result={
      "jsFile":jsFile,
      "cssFile":cssFile,
      "image":image,
      "sladarAndTEA":sladarAndTEA,
      "other":other
    }
  
    return {"result":result,"performanceMetrics":performanceMetrics};
  }
  
  module.exports = testPage;