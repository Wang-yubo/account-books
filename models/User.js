//* 这部分是用户数据库

//* 引入mongoose
const mongoose = require("mongoose");

//* 定义骨架 , Schema是架构的意思
const Schema = mongoose.Schema

//* 实例化骨架
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
    },
    identity: {
        type: String,
        require: true
    }
})

//* 创建模型,模型叫users,使用刚刚创建的userSchema骨架
const User = mongoose.model("users", userSchema)

//* 导出模块
module.exports = User