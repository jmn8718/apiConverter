var express = require('express');
var router = express.Router();
var path = require('path');

var raml2html = require('raml2html');

router.get('/twitterApiDoc', function(req, res, next) {
    var file = 'api.raml';
    var file = 'accounts_v2.raml';
    //var file = 'github.raml';
    // var file = 'example.raml';

    var pathfile = path.join(__dirname, '../../resources/raml',file);

    var templatesPath = path.join( __dirname, '../templates/raml2html/twitterApiDoc')
    var configWithCustomTemplates = raml2html.getDefaultConfig('template.nunjucks', templatesPath);

    raml2html.render(pathfile, configWithCustomTemplates).then(function(result) {
        res.end(result)
    }, function(error) {
        next(error)
    });
});

router.get('/blueprint/raml2html', function(req, res, next) {
    var file = 'api.apib.raml';
    var file = 'accounts_v2.apib.raml';
    //var file = 'github.apib.raml';
    // var file = 'example.apib.raml';
    //  var file = 'pubapis.apib.raml';

    var pathfile = path.join(__dirname, '../../resources/blueprint',file);

    var configWithCustomTemplates = raml2html.getDefaultConfig();

    raml2html.render(pathfile, configWithCustomTemplates).then(function(result) {
        res.end(result)
    }, function(error) {
        next(error)
    });
});

router.get('/raml/raml2html', function(req, res, next) {
    var file = 'api.raml';
    var file = 'accounts_v2.raml';
    //var file = 'github.raml';
    // var file = 'example.raml';

    var pathfile = path.join(__dirname, '../../resources/raml',file);

    var configWithCustomTemplates = raml2html.getDefaultConfig();

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
