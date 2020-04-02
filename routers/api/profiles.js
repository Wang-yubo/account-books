//* 引入基本的依赖 
const express = require("express");
const app = express();
const router = express.Router();
const Profile = require("../../models/Profile")
const bcrypt = require("bcryptjs")

const jwt = require("jsonwebtoken")
const key = require("../../config/keys").secretorKey
const passport = require("passport")

router.get("/test", (req, res) => {
    res.json({
        msg: "成功"
    })
})

//* 增
router.post("/add", passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        const profileFields = {};
        if (req.body.type) {
            profileFields.type = req.body.type
        }
        if (req.body.descript) {
            profileFields.descript = req.body.descript
        }
        if (req.body.income) {
            profileFields.income = req.body.income
        }
        if (req.body.expend) {
            profileFields.expend = req.body.expend
        }
        if (req.body.cash) {
            profileFields.cash = req.body.cash
        }
        if (req.body.remake) {
            profileFields.remake = req.body.remake
        }

        //* 新建数据表 存储数据
        new Profile(profileFields)
            .save()
            .then(
                Profile => {
                    res.json(Profile)
                }
            )
            .catch(err => {
                throw err
            })
    })

// *查 
router.get("/", passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        Profile.find()
            .then(
                Profile => {
                    if (!Profile) {
                        return res.status(404).json("没有查到内容")
                    }
                    res.json(Profile)
                }
            )
            .catch(err => {
                res.status(404).json(err)
            })
    })

// *根据id单个查找
router.get("/:id", passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        Profile.findOne({
                _id: req.params.id
            })
            .then(
                Profile => {
                    if (!Profile) {
                        return res.status(404).json("没有查到内容")
                    }
                    res.json(Profile)
                }
            )
            .catch(err => {
                res.status(404).json(err)
            })
    }
)

router.post("/edit/:id", passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {

        const profileFields = {};
        if (req.body.type) {
            profileFields.type = req.body.type
        }
        if (req.body.descript) {
            profileFields.descript = req.body.descript
        }
        if (req.body.income) {
            profileFields.income = req.body.income
        }
        if (req.body.expend) {
            profileFields.expend = req.body.expend
        }
        if (req.body.cash) {
            profileFields.cash = req.body.cash
        }
        if (req.body.remake) {
            profileFields.remake = req.body.remake
        }
        //* 更新数据:先找到id,改变,确认更新
        Profile.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: profileFields
            }, {
                new: true
            })
            .then(profile => {
                res.json(profile)
            })
    })

// * 删单个数据
router.delete("/delete/:id", passport.authenticate('jwt', {
        session: false
    }),
    (req, res) => {
        Profile.findOneAndDelete({
                _id: req.params.id
            })
            .then(
                profile => {
                    profile
                        .save()
                        .then(
                            profile => {
                                res.json(profile)
                            }
                        )
                        .catch(err => {
                            res.status(404).json(err)
                        })
                }
            )
            .catch(err => {
                res.json(err)
            })
    })
module.exports = router;