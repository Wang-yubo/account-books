//* 引入express框架
const express = require("express");

//* 实例化一个express
const app = express();

//* 实例化一个路由
const router = express.Router();

//* 引入用户数据模型
const User = require("../../models/User")

//* 引入bcryptjs验证模块
const bcrypt = require("bcryptjs")

//* 引入头像处理包
const gravatar = require('gravatar');

//* 引入jsonwebtoken
const jwt = require("jsonwebtoken")

//* 引入默认秘钥
const key = require("../../config/keys").secretorKey

//* 引入passport
const passport = require("passport")

//* 配置路由
router.get('/', (req, res) => {
    res.json({
        tip: "Fuck"
    })
})

//* 处理注册业务
router.post("/register", (req, res) => {
    // console.log(req.body);
    //* 匹配数据库,对应地查找内容,
    //* findOne是mongoose提供的一个方法
    User.findOne({
        email: req.body.email
    }).then(
        user => {
            //*user 代表查找的返回值
            // console.log(user);
            if (user) {
                return res.status(400).json("该邮箱已经被注册了")
            } else {
                //* 设置一个默认的头像
                var avatar = gravatar.url('760478684@qq.com', { s: '200', r: 'pg', d: '404' });
                // console.log("该邮箱可以使用");
                //* 实例化一个新的对象,这个对象需要和数据库匹配 
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity: req.body.identity,
                })

                //* 验证模块
                bcrypt.genSalt(10, function(err, salt) {
                    // console.log(salt);
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if (err) console.log(err)
                            // console.log(hash);
                        newUser.password = hash;
                        //* 保存用户的注册信息
                        newUser.save()
                            //* 抛出信息给前端接收
                            .then(user => {
                                res.json(user)
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    });
                });
            }
        }
    )

})

//* 处理登录模块
router.post("/login", (req, res) => {
    // console.log(req.body);
    //* 获取用户输入的密码和邮箱
    const email = req.body.email;
    const password = req.body.password

    //* 匹配数据库
    User.findOne({ email })
        //* 匹配完成之后拿到匹配结果
        .then(user => {
            //* 如果没有,
            if (!user) {
                return res.status(400).json("用户不存在")
            } else { //* 如果有则验证密码
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            //* 如果匹配不成功
                            return res.status(400).json("主人,密码不正确哦,您再想想~")
                        } else {
                            //* 如果匹配成功,也还需要通行证,使用token进行验证
                            //* 该方法有四个参数:规则,加密名字,{对象,比如过期时间},回调
                            //* 规则一般是匹配数据库中每个字段的id,因为这是唯一值
                            //* 创建规则
                            const rule = {
                                id: user.id,
                                name: user.name,
                                avatar: user.avatar,
                                identity: user.identity
                            }
                            jwt.sign(rule, key, { expiresIn: 60*60 }, (err, token) => {
                                if (err) { throw err }
                                //* 匹配成功时返回秘钥
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                })
                            })
                        }
                    })
            }
        })
})

// *上面验证完成之后,进入授权
router.get("/current", passport.authenticate('jwt', { session: false }),
    (req, res) => {
        //* 授权成功,把参数返回给前端
        res.json({
            id: req.user.id,
            name: req.user.name,
            identity: req.user.identity,
            email: req.user.email
        })
    })


//* 暴露路由
module.exports = router;