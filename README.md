# CRUD_nodejs
基于express的简单登录 数据增删改查
## 主文件
```javascript
const express = require('express');
const app = express();
const loginRouter = require('./server/loginRouter');  //登录
const homeRouter = require('./server/homeRouter');   //主页


//静态资源
app.use(express.static('./public'));

//解析json
app.use(express.json());


//登录
app.use(loginRouter);

//主页
app.use(homeRouter)


//启动服务
app.listen(8080,console.log(8080));
```
