//* 这部分是新的数据表

//* 引入mongoose
const mongoose = require("mongoose");

//* 定义骨架 , Schema是架构的意思
const Schema = mongoose.Schema

//* 实例化骨架
const ProfileSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    descript: {
        type: String,
    },
    income: {
        type: String,
        required: true
    },
    expend: {
        type: String,
        default: Date.now
    },
    cash: {
        type: String,
        required: true
    },
    remake: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

//* 创建模型
const Profile = mongoose.model("profile", ProfileSchema)

//* 导出模块
module.exports = Profile