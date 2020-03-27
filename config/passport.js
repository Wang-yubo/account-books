var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
// *引入mongoose
const mongoose = require("mongoose")

// * 引入数据库模型
const User = mongoose.model("users")

// *下面这两行可以不要
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

module.exports = passport => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        // console.log(789);
        // console.log(jwt_payload);
        User.findById(jwt_payload.id)
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, fasle)
            })
            .catch(err => {
                console.log(err);
            })
    }));
}