var express = require('express');
var router = express.Router();
var model = require('../model');

function hasOwnProperty (o, p) {
    return Object.prototype.hasOwnProperty.call(o, p);
}

function validateData (o) {
    var valid = o !== null && typeof o === 'object';
    valid = valid && hasOwnProperty(o, 'brand');
    valid = valid && hasOwnProperty(o, 'color');
    valid = valid && typeof o.brand === 'string';
    valid = valid && typeof o.color === 'string';
    return valid && {
        brand: o.brand,
        color: o.color
    };
}

function validateBody (o) {
    var valid = o !== null && typeof o === 'object';
    valid = valid && hasOwnProperty(o, 'data');
    valid = valid && o.data !== null && typeof o.data === 'object';
    var data = valid && validateData(o.data);
    return valid && data && {
        data: data
    };
}

function isIdValid (n) {
    n = Number(n)
    var MAX_SAFE = Math.pow(2, 53) - 1
    return isFinite(n) && Math.floor(n) === n && Math.abs(n) <= MAX_SAFE
}

function isParamsValid (o) {
    var valid = o !== null && typeof o === 'object';
    valid = valid && hasOwnProperty(o, 'id');
    valid = valid && isIdValid(o.id);
    return valid;
}

function badRequest () {
    const err = new Error('Bad Request');
    err.status = 400;
    return err;
}

router.get('/:id', function(req, res, next) {
    if (isParamsValid(req.params)) {
        model.bicycle.read(req.params.id, (e, result) => {
            if (e) {
                if (e.message === 'not found') next();
                else next(e);
            } else {
                var sanitizedResult = validateData(result);
                if (sanitizedResult){
                    res.send(sanitizedResult);
                } else {
                    next(new Error('Server Error'));
                }
            }
        });
    } else {
        next(badRequest());
    }
});

router.post('/', function(req, res, next) {
    var id = model.bicycle.uid();
    var body = validateBody(req.body);
    if (body) {
        model.bicycle.create(id, body.data, (e) => {
            if (e) next(e);
            else {
                if (isIdValid(id)) res.status(201).send({ id });
                else next(new Error('Server Error'));
            }
        });
    } else {
        next(badRequest());
    }
});

router.post('/:id/update', function(req, res, next) {
    if (isParamsValid(req.params)) {
        var body = validateBody(req.body);
        if (body) {
            model.bicycle.update(req.params.id, body.data, (e) => {
                if (e) {
                    if (e.message === 'not found') next();
                    else next(e);
                } else res.status(204).send();
            });
        } else {
            next(badRequest());
        }
    } else {
        next(badRequest());
    }
});

router.put('/:id', function(req, res, next) {
    if (isParamsValid(req.params)) {
        var body = validateBody(req.body);
        if (body) {
            model.bicycle.create(req.params.id, body.data, (e) => {
                if (e) {
                    if (e.message === 'resource exists') {
                        model.bicycle.update(req.params.id, body.data, (e) => {
                            if (e) next(e);
                            else res.status(204).send();
                        });
                    } else next(e);
                } else res.status(201).send({  });
            });
        } else {
            next(badRequest());
        }
    } else {
        next(badRequest());
    }
});

router.delete('/:id', function(req, res, next) {
    if (isParamsValid(req.params)) {
        model.bicycle.del(req.params.id, (e) => {
            if (e) {
                if (e.message === 'not found') next();
                else next(e);
            } else res.status(204).send();
        });
    } else {
        next(badRequest());
    }
});

module.exports = router;
