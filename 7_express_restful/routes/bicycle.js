var express = require('express');
var router = express.Router();
var model = require('../model');

router.get('/:id', function(req, res, next) {
    model.bicycle.read(req.params.id, (e, result) => {
        if (e) {
            if (e.message === 'not found') next();
            else next(e);
        } else {
            res.send(result);
        }
    });
});

router.post('/', function(req, res, next) {
    var id = model.bicycle.uid();
    model.bicycle.create(id, req.body.data, (e) => {
        if (e) next(e);
        else res.status(201).send({ id });
    });
});

router.post('/:id/update', function(req, res, next) {
    model.bicycle.update(req.params.id, req.body.data, (e) => {
        if (e) {
            if (e.message === 'not found') next();
            else next(e);
        } else res.status(204).send();
    });
});

router.put('/:id', function(req, res, next) {
    model.bicycle.create(req.params.id, req.body.data, (e) => {
        if (e) {
            if (e.message === 'resource exists') {
                model.bicycle.update(req.params.id, req.body.data, (e) => {
                    if (e) next(e);
                    else res.status(204).send();
                });
            } else next(e);
        } else res.status(201).send({  });
    });
});

router.delete('/:id', function(req, res, next) {
    model.bicycle.del(req.params.id, (e) => {
        if (e) {
            if (e.message === 'not found') next();
            else next(e);
        } else res.status(204).send();
    });
});

module.exports = router;
