const express = require('express');
const router = express.Router();
const fs = require('fs')
let userList = require('../mock/user.json');
module.exports = router;
//主页
router.get('/home',(req,res)=>{
    let token = req.query['token'] 
    if(token){
        let flag = userList.find(item=>item.token === token); //匹配账号密码
        console.log(flag);
        flag ? res.send(fs.readFileSync("./mock/html/setList.html","utf8")):res.send({statu:'reject',mes:"非法访问"})

    } else {
        res.send({statu:'reject',mes:"非法访问"})
    }
})

router.post('/api/getCont',(req,res)=>{
    let data = JSON.parse(fs.readFileSync('./mock/data.json'));
    let maxPage = Math.ceil(data.length / 12)
    //分页
    data = pageChange(data,req.body.page)

    res.send({statu:"ok",mes:'数据请求成功',data,maxPage})
})


//设置
router.post('/api/set',(req,res)=>{
    if(req.body.token === 'ftMZwrwQp5xMZuumYcKAkEIb8dCHPl92'){
        let data = JSON.parse(fs.readFileSync('./mock/data.json'));
        data.forEach(element => {
            if(element.id === req.body.id){
                Object.assign(element,req.body);

                fs.writeFileSync('./mock/data.json',JSON.stringify(data),'utf8');
                let maxPage = Math.ceil(data.length / 12)
                data = pageChange(data,req.body.page)
                res.send({statu:"ok",mes:'修改成功',data,maxPage})
                return
            }
        });
    } else {
        res.send({statu:"reject",mes:'该账号无权访问',data:[]})
    }
})

//删除信息
router.post('/api/del',(req,res)=>{
    if(req.body.token === 'ftMZwrwQp5xMZuumYcKAkEIb8dCHPl92'){ 
        let data = JSON.parse(fs.readFileSync('./mock/data.json'));
        data = data.filter(item => {
            return item.id !== req.body.id
        });
        
        fs.writeFileSync('./mock/data.json',JSON.stringify(data),'utf8');
        let maxPage = Math.ceil(data.length / 12) 
        data = pageChange(data,req.body.page)
        res.send({statu:"ok",mes:'删除成功',data,maxPage})
    } else {
        res.send({statu:"reject",mes:'该账号无权访问',data:[]})
    }
})

//添加信息
router.post('/api/addCont',(req,res)=>{
    let data = JSON.parse(fs.readFileSync('./mock/data.json'));
    let {name,jobNumber,phone,designation,grade,gradeName,id} = req.body;

    data.push({name,jobNumber,phone,designation,grade,gradeName,id})
    fs.writeFileSync('./mock/data.json',JSON.stringify(data),'utf8');
    
    let maxPage = Math.ceil(data.length / 12) 
    data = pageChange(data,req.body.page)
    res.send({statu:"ok",mes:'添加成功',data,maxPage})
    
})

//查找信息
router.post('/api/find',(req,res)=>{
    let data = JSON.parse(fs.readFileSync('./mock/data.json'));
    let newList = data.filter(item=>{
        return item.name.includes(req.body.name)
    })
    let maxPage = Math.ceil(newList.length / 12) 
    //newList = pageChange(newList,req.body.page)
    res.send({statu:"ok",mes:'查找完毕',data:newList,maxPage})
})


function pageChange(data,page){
    return data.slice(page*12,page*12+12)

}

