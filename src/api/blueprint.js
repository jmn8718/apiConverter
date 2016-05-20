var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var protagonist = require('protagonist');
var aglio = require('aglio');

var apib2swagger = require('apib2swagger')
var converter = require('swagger-to-raml-object');
var toRAML = require('raml-object-to-raml');

var utils = require('../lib/utils')
var blueprint2raml = require('../lib/blueprint2raml').blueprint2raml;
var raml2blueprint = require('../lib/raml2blueprint').raml2blueprint;
var apimarket_theme = require('../lib/apimarket-theme')

router.get('/parser', function(req, res, next) {
  var file = req.query.file;
  console.log(file)
  if(file.length > 0 || file.indexOf('.apib')<0 || file.indexOf('.md')<0){
    var pathfile = path.join(__dirname, '../../resources/blueprint',file);
    console.log(pathfile);

    var option = {
      requireBlueprintName: true,
      //type: 'ast',
      generateSourceMap: true
    }
    fs.readFile(pathfile, 'utf-8', function(error, content){
      if(error)
        next(error)
      else
        protagonist.parse(content, function(error, data) {
          if (error)
            next(error)
          else{
            //console.log(data);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(data,null,2));
          }
        });
    })
  } else {
    res.end('Blueprint File: '+file + ' doesn\'t provided');
  }
});

router.get('/parser_ast', function(req, res, next) {
    var file = req.query.file;
    console.log(file)
    if(file.length > 0 || file.indexOf('.apib')<0 || file.indexOf('.md')<0){
        var pathfile = path.join(__dirname, '../../resources/blueprint',file);
        console.log(pathfile);

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
                        utils.toFile(pathfile+'.json',JSON.stringify(data,null,2))
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify(data,null,2));
                    }
                });
        })
    } else {
        res.end('Blueprint File: '+file + ' doesn\'t provided');
    }
});

router.get('/aglio', function(req, res, next) {
  var file = req.query.file;
  console.log(file)
  if(file.length > 0 || file.indexOf('.apib')<0 || file.indexOf('.md')<0){
    var pathfile = path.join(__dirname, '../../resources/blueprint',file);
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
            //if (warnings)
              //console.log(warnings);
            //console.log(result);
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.end(result);
          }
        });
    })
  } else {
    res.end('Blueprint File: '+file + ' doesn\'t provided');
  }
});
/*
 https://github.com/kminami/apib2swagger/blob/master/index.js
 */
//router.get('/convert', function(req, res, next){
//  var file = req.query.file;
//  console.log(file)
//  if(file.length > 0 || file.indexOf('.apib')<0 || file.indexOf('.md')<0){
//    var pathfile = path.join(__dirname, '../../resources/blueprint',file);
//    console.log(pathfile);
//
//    fs.readFile(pathfile, 'utf-8', function(error, content){
//      if(error)
//        next(error)
//      else{
//        protagonist.parse(content, function(error, data) {
//          if (error)
//            next(error)
//          else{
//            //console.log(data);
//            blueprintObj2RamlObj(data,function(err, ramlObj){
//              if(err)
//                next(err)
//              else{
//                var str = toRAML(ramlObj);
//                utils.toFile(pathfile+'.raml',str)
//                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
//                res.end(str);
//                //res.writeHead(200, {"Content-Type": "application/json"});
//                //res.end(JSON.stringify(ramlObj,null,2));
//              }
//            })
//          }
//        });
//      }
//    })
//  } else {
//    res.end('Blueprint File: '+file + ' doesn\'t provided');
//  }
//});

router.get('/toraml', function(req, res, next) {
    var file = req.query.file;
    console.log(file)
    if(file.length > 0 || file.indexOf('.apib')<0 || file.indexOf('.md')<0){
        var pathfile = path.join(__dirname, '../../resources/blueprint',file);
        console.log(pathfile);

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
                                utils.toFile(pathfile+'.raml',str)
                                res.writeHead(200, {"Content-Type": "application/json"});
                                res.end(JSON.stringify(ramlObj,null,2));
                            }
                        })
                    }
                });
        })
    } else {
        res.end('Blueprint File: '+file + ' doesn\'t provided');
    }
});

router.get('/raml',function(req, res, next){
    raml2blueprint({}, function (err, content) {
        if(err)
            next(err)
        else {
            raml2blueprint('',function(err,blueprint){
                apimarket_theme.render(blueprint,{},function(err, html){
                    if(err)
                        console.log(err)
                    else{
                        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                        res.end(html);
                    }
                })
            })
        }
    })
});

router.get('/', function(req, res, next) {
  res.render('blueprint', { title: 'Blueprint' });
});

module.exports = router;
