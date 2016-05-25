var express = require('express');
var router = express.Router();
var path = require('path');

var raml2html = require('raml2html');

router.get('/', function(req, res, next) {
    var file = 'api.raml';
    var file = 'accounts_v2.raml';
    //var file = 'github.raml';
    //var file = 'example.raml';

    var pathfile = path.join(__dirname, '../../resources/raml',file);

    var templatesPath = path.join( __dirname, '../templates/raml2html/twitterApiDoc')
    var configWithCustomTemplates = raml2html.getDefaultConfig('template.nunjucks', templatesPath);

    raml2html.render(pathfile, configWithCustomTemplates).then(function(result) {
        res.end(result)
    }, function(error) {
        next(error)
    });
});


router.get('/', function(req, res, next) {
    res.render('raml', { title: 'Raml' });
});

module.exports = router;
