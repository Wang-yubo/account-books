const express = require('express'),
    router = express.Router(),
    user = require('./api/users'),
    profile = require('./api/profiles')


router.get('/', (req, res) => {
    res.send('1111');
})

router.use('/users', user);
router.use('/profile', profile);


module.exports = router;