const express = require('express');
const router = express.Router();
module.exports = router;
let userList = require('../mock/user.json')

//登陆
router.post('/api/login',(req,res)=>{

    
    let {user,pwd} = req.body;

    let flag = userList.find(item=>item.username === user && pwd ===item.password); //匹配账号密码
    if(flag){
        console.log(user+"登录成功");
        res.send({statu:"ok",mes:"登录成功",token:flag.token})
    } else{
        res.send({statu:"reject",mes:"账号或密码错误"})
    }

})

