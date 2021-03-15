const Mock = require('mockjs');
const fs = require('fs');

let userList = Mock.mock({
    "userList|6" : [{
        "username":/^\w{6,12}$/,
        "password":/^\w{6,12}$/,
        "mobile":/^1[3-9]\d{9}$/,
        "token":/^\w{32}$/
    }]
})

fs.writeFileSync('user.json',JSON.stringify(userList.userList),"utf8");