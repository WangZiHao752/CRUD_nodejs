const express = require('express');
const router = express.Router();
const fs = require('fs');


let each_page = 12;   //每页个数

router.post('/api/getCont',(req,res)=>{
    let {token,page} = req.body;
    let userList = JSON.parse(fs.readFileSync('mockuser.json'));
    let flag = userList.find(item=> token === item.token)

    
    if(flag){
        let data = JSON.parse(fs.readFileSync('mock/data.json'));
        let maxPage = Math.ceil(data.length/each_page);  //最大页数
        //分页
        data = data.slice(page*each_page,page*each_page+each_page)

        res.send({statu:"ok",mes:'数据请求成功',data,maxPage})
    } else {
        res.send({statu:"reject",mes:'数据请求失败,请重新登录'})
    }
})

//抛出模块
module.exports = router;