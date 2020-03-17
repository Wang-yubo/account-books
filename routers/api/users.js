//* 引入express框架
const express = require("express");
//* 实例化一个express
const app = express();
//* 实例化一个路由
const router = express.Router();
//* 配置路由
router.get("/", (req, res) => {
    res.json({
        msg: "这个是测试数据"
    })
})



//* 暴露路由
module.exports = router;