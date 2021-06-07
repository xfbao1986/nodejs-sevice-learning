var express = require('express');
var router = express.Router();
var stream = require('../../stream')
var finished = require('stream').finished

router.get('/', function(req, res, next) {
    var s = stream()
    s.pipe(res, {end: false})

    finished(s, (e) => {
        if(e) {
            next(e)
            return
        }
        res.end()
    })
});

module.exports = router;
