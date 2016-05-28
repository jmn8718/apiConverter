var express = require('express');
var router = express.Router();
var multer = require('multer');
var converter = require('../lib/converter').convert;

var upload = multer({
    // storage: multer.memoryStorage(),
    dest: './tmp',
    fileFilter: function(req, file, cb) {
        var valid,indexOfLast;

        valid = false;
        indexOfLast = file.originalname.lastIndexOf('.')

        if(indexOfLast > 0)
            valid = file.originalname.indexOf('raml',indexOfLast) > 0 ||
                file.originalname.indexOf('apib',indexOfLast) > 0 ||
                file.originalname.indexOf('md',indexOfLast) > 0;

        cb(null, valid)
    }

}).single('file');

router.post('/', upload , function(req, res, next) {
    if(req.file === undefined || req.file.length <= 0)
        next(new Error('No allowed file provided'))
    else {
        console.log(req.file)
        console.log(req.query)

        if(req.file.originalname.indexOf('raml')>0)
            res.redirect('/api/v1/uploads/raml?file='+req.file.path)
        else if(req.file.originalname.indexOf('apib')>0 || req.file.originalname.indexOf('md')>0)
            if(req.query.convert)
                res.redirect('/api/v1/uploads/blueprint2raml?file='+req.file.path)
            else
                res.redirect('/api/v1/uploads/blueprint?file='+req.file.path)
        else
            next(new Error('Something went wrong'))
    }
});

module.exports = router;
