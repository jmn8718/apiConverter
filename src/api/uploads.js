var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs')

var raml2html = require('raml2html');
var aglio = require('aglio');
var protagonist = require('protagonist');

var blueprint2raml = require('../lib/blueprint2raml').blueprint2raml;
var toRAML = require('raml-object-to-raml');


var configWithDefaultTemplates = raml2html.getDefaultConfig();

router.get('/raml', function(req, res, next) {
    var file = req.query.file;
    var pathfile = path.join(__dirname, '../../',file);
    console.log(pathfile)
    raml2html.render(pathfile, configWithDefaultTemplates).then(function(result) {
        res.end(result)
    }, function(error) {
        next(error)
    });
});

router.get('/blueprint', function(req, res, next) {
    var file = req.query.file;
    var pathfile = path.join(__dirname, '../../',file);
    console.log(pathfile);

    var options = {
        //themeFullWidth: true,
        //themeTemplate: 'triple',
        //themeVariables: 'default'
        //themeVariables: 'streak'
        //themeVariables: 'cyborg'
        themeVariables: 'slate'
        //themeVariables: 'flatly'
    };

    fs.readFile(pathfile, 'utf-8', function(error, content){
        if(error)
            next(error)
        else
            aglio.render(content, options, function (err, result, warnings) {
                if (err)
                    next(err)
                else{
                    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                    res.end(result);
                }
            });
    })

});

router.get('/blueprint2raml', function(req, res, next) {
    var file = req.query.file;
    var pathfile = path.join(__dirname, '../../',file);
    console.log(pathfile)

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

module.exports = router;
