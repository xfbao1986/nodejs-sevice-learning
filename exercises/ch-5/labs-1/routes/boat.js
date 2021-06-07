var express = require('express');
var router = express.Router();
var model = require('../model');

router.get('/:id', function(req, res, next) {
    model.boat.read(req.params.id, (e, result) => {
        if (e) {
            if (e.code === 'E_NOT_FOUND') next();
            else next(e);
        } else {
            res.send(result)
        }
    })
});

module.exports = router;
