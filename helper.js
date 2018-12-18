const fs = require('fs');

const getTimeFromPerformanceMetrics = (metrics, name) =>
  metrics.metrics.find(x => x.name === name).value * 1000;

const extractDataFromTracing = (path, name) =>
  new Promise(resolve => {
    fs.readFile(path, (err, data) => {
      const tracing = JSON.parse(data);
      const resourceTracings = tracing.traceEvents.filter(
        x =>
          x.cat === 'devtools.timeline' &&
          typeof x.args.data !== 'undefined' &&
          typeof x.args.data.url !== 'undefined'
      );
      const resourceTracingSendRequest = resourceTracings.filter(
        x => x.name === 'ResourceSendRequest'
      );
      const resourceTracingEnd = tracing.traceEvents.filter(
        x =>
          x.cat === 'devtools.timeline' &&
          typeof x.args.data !== 'undefined' &&
          typeof x.args.data.requestId !== 'undefined'
      )
      let result = [];
      for (let request of resourceTracingSendRequest) {
        let info = {};
        info.url = request.args.data.url;
        info.requestId = request.args.data.requestId;
        info.resourceTracingStartTime = request.ts / 1000;
        response = resourceTracingEnd.find(x => x.name === 'ResourceFinish' && x.args.data.requestId === info.requestId);
        if (response == undefined) {
          info.resourceTracingEndTime=Infinity;
        } else {
          info.resourceTracingEndTime = response.ts / 1000;
          result.push(info);
        }
      }
      resolve(result);
    });
  });

module.exports = {
  getTimeFromPerformanceMetrics,
  extractDataFromTracing,
};
