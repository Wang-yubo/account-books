//* 引入express框架
const express = require("express");

//* 引入mongoose,连接数据库
const mongoose = require("mongoose");

//* 引入分离出去的数据库接口
const db = require("./config/keys").mongoURL

//* 引入passport
const passport = require("passport")

//* 实例化一个express
const app = express();

//* 设置端口,使用设置好的端口,如果没有就时使用5002
const port = process.env.PORT || 5002;

//*
const api = require('./routers/api')

//* 引入users模块
const users = require("./routers/api/users")

//* 引入profiles模块
const profiles = require("./routers/api/profiles")

//* 引入body-parser包
const bodyParser = require("body-parser")

//* mongodb+srv://wyb:wyb123..@cluster0-afwz7.mongodb.net/test?retryWrites=true&w=majority

//* 使用mongoose.connect连接数据库,这里可以用回调也可以用promise
//* 这里把是数据库路径分离出去,方便后去修改维护
mongoose.connect(db, {
        //* 最好再设置上提示的这两条
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }) //* 如果成功
    .then(() => {
        console.log("数据库连接成功");
    }) //* 如果失败 用catch捕获err
    .catch((err) => {
        console.log(err);
    })


//* 使用body-parse
//* parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//* parse application/json
app.use(bodyParser.json())

// * 初始化passport
app.use(passport.initialize())

//* 引入并且执行暴露出去的passport函数
require("./config/passport")(passport)

//* 配置根路由
app.get("/", (req, res) => {
        res.send("hello world")
    })
    //*  挂载api模块
app.use("/api", api)

//* 挂载users模块
// app.use("/api/users", users)

// //* 挂载profiles模块
// app.use("/api/profiles", profiles)


//* 监听设置好的端口
app.listen(port, () => {
    console.log(port);
})