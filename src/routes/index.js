var express = require('express');
var router = express.Router();

var upload = require('./upload');

var path = require('path');
var fs = require('fs')
var raml2html = require('raml2html');
var protagonist = require('protagonist');

var blueprint2raml = require('../lib/blueprint2raml').blueprint2raml;
var toRAML = require('raml-object-to-raml');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function(req, res, next) {
    res.render('home');
});

router.get('/api_documentation', function(req, res, next) {
    res.render('api_documentation', { title: 'API DOC' });
});

router.get('/am', function(req, res, next) {
    var file = '13f9a45ef299f7382e97500a8c4ca5c6'
    var pathfile = path.join(__dirname, '../../tmp',file);
    var options = {
        requireBlueprintName: true,
        type: 'ast',
        // generateSourceMap: true
    }
    fs.readFile(pathfile, 'utf-8', function(error, content){
        if(error)
            next(error)
        else
            protagonist.parse(content, options, function(error, data) {
                if (error)
                    next(error)
                else{
                    //console.log(data);
                    blueprint2raml(data.ast, function(err, ramlObj){
                        if(err)
                            next(err)
                        else {
                            var str = toRAML(ramlObj);
                            var config = raml2html.getDefaultConfig('am_doc.njk', path.join(__dirname, '../templates/raml2html/am_doc'));
                            console.log(str)
                            raml2html.render(str, config).then(function(result) {
                                res.end(result)
                            }, function(error) {
                                next(error)
                            });
                        }
                    })
                }
            });
    })
});
router.use('/upload', upload);

module.exports = router;
