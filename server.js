//* 引入express框架
const express = require("express");

//* 引入mongoose,连接数据库
const mongoose = require("mongoose");

//* 引入分离出去的数据库接口
const db = require("./config/keys").mongoURL

//* 实例化一个express
const app = express();

//* 设置端口,使用设置好的端口,如果没有就时使用5002
const port = process.env.PORT || 5002;

//* 引入users模块
const users = require("./routers/api/users")

//* mongodb+srv://wyb:wyb123..@cluster0-afwz7.mongodb.net/test?retryWrites=true&w=majority

//* 使用mongoose.connect连接数据库,这里可以用回调也可以用promise
//* 这里把是数据库路径分离出去,方便后去修改维护
mongoose.connect(db, {
        //* 最好再设置上提示的这两条
        useNewUrlParser: true,
        useUnifiedTopology: true
    }) //* 如果成功
    .then(() => {
        console.log("数据库连接成功");
    }) //* 如果失败 用catch捕获err
    .catch((err) => {
        console.log(err);
    })

//* 配置根路由
app.get("/", (req, res) => {
    res.send("hello world")
})

//* 挂载users模块
app.use("/api/users", users)

//* 监听设置好的端口
app.listen(port, () => {
    console.log(port);
})