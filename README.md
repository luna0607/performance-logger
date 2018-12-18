# performance-logger
Record webpage's performance using puppeteer. You can see the time of resource loading and other messages in output file.(like Chrome deelopTools)

This is a personal version based on this blog.(https://michaljanaszek.com/blog/test-website-performance-with-puppeteer)

使用puppeteer来记录网页的性能，你可以在输出文件中看见资源加载的时间以及其他信息。（类似于Chrome开发者工具）

这个项目是在这篇博客基础上的个人版本。

## Usage

```
npm install
node index.js
 ```
#### Output

log.json

 ```
 {
    "result": {
        "jsFile": [...],
        "cssFile": [...],
        "image": [...],
        "sladarAndTEA": [...],
        "other": [
            {
                "url": "https://hotsoon.snssdk.com/magic/runtime/?id=3260",
                "requestId": "711ADD06460478E66F5FB7CCEEC22979",
                "time": 5.603999987244606
            },
            ...
        ]
    },
    "performanceMetrics": {
        "metrics": [
            ...,
            {
                "name": "JSHeapUsedSize",
                "value": 8320656
            },
            {
                "name": "JSHeapTotalSize",
                "value": 18702336
            },
            {
                "name": "FirstMeaningfulPaint",
                "value": 101859.082802
            },
            {
                "name": "DomContentLoaded",
                "value": 101858.572326
            },
            {
                "name": "NavigationStart",
                "value": 101857.966412
            }
        ]
    }
}
  ```
