const fs = require('fs');

async function logger( content, type) {
    if (type == "json") {
        content = JSON.stringify(content);
    }
    fs.writeFile("./log.json", content,{"flag":"a"},function(err){
        if(err){
            console.log(err);
        }else{
            fs.unlinkSync("trace.json");
            console.log("输出完成")
        }
    });
}

module.exports = logger;