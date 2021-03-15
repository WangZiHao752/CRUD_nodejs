const Mock = require('mockjs');
const fs = require('fs');


let data = Mock.mock({
    "list|2000":[{
        "name":"@cname",
        "jobNumber|7600-8600":1,
        "phone":/^1[3-9]\d{9}$/,
        "designation":"@name",
        "grade|0-2":1,
        "gradeName|0-2":1,
        "id":'@id'
    }]
})
fs.writeFileSync('data.json',JSON.stringify(data.list),"utf8");