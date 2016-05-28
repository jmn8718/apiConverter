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

}).single('upl');

router.post('/', upload , function(req, res, next) {
    if(req.file === undefined || req.file.length <= 0)
        next(new Error('No allowed file provided'))
    else {
        console.log(req.file)
        res.redirect('templates/temp?file='+req.file.path)
        // var filename = req.file.originalname;
        // var contentFile = req.file.buffer.toString('utf8');
        //
        // converter(filename, contentFile, function(err, convertedContent){
        //     if(err)
        //         next(err)
        //     res.end(convertedContent)
        // })
    }
});

module.exports = router;
