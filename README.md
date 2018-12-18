# performance-logger
Record webpage's performance using puppeteer. You can see the time of resource loading and other messages in output file.(like Chrome deelopTools)

This is a personal version based on this blog.(https://michaljanaszek.com/blog/test-website-performance-with-puppeteer)

使用puppeteer来记录网页的性能，你可以在输出文件中看见一个网页的各种资源加载的时间以及其他信息。（类似于Chrome开发者工具）

这个项目是在这篇博客基础上的个人版本。

以https://github.com/luna0607为例，它记录各种资源的加载时间、渲染时间，类似瀑布图，但生成的是json文件，且可以测试多个网页、测试有cache和无cache的加载速度。

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
                "url": "https://hotsoon.snssdk.com/magic/runtime/?id=3260",//加载资源的url
                "requestId": "711ADD06460478E66F5FB7CCEEC22979",
                "time": 5.603999987244606                                  //耗费的时间
            },
            ...
        ]
    },
    "performanceMetrics": {
        "metrics": [
            ...,
            {
                "name": "JSHeapUsedSize",//堆使用量
                "value": 8320656
            },
            {
                "name": "JSHeapTotalSize",//堆总容量
                "value": 18702336
            },
            {
                "name": "FirstMeaningfulPaint",//首次有效渲染时间
                "value": 101859.082802
            },
            {
                "name": "DomContentLoaded",//文档加载时间
                "value": 101858.572326
            },
            {
                "name": "NavigationStart",//启动加载时间
                "value": 101857.966412
            }
        ]
    }
}
  ```
