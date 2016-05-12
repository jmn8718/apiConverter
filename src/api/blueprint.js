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

var blueprintObj2RamlObj = function(blueprintObj, callback){
  //var err = new Error("Error converting blueprint object to ramlobject");
  //callback(err);
  var ramlObj = {}
  //DEFAULT
  ramlObj.version = 'v1';
  ramlObj.protocols = ['HTTP']
  //ramlObj.securitySchemes = []
  //ramlObj.securedBy = []
  //ramlObj.mediaType = "application/json"
  //ramlObj.resourceTypes = []
  //ramlObj.traits = []
  ramlObj.resources = []

  //FROM OBJ
  ramlObj.title = blueprintObj.content[0].meta.title;
  ramlObj.baseUri = blueprintObj.content[0].attributes.meta[1].content.value.content;
  ramlObj.documentation = [{
    'title': '',
    'content': blueprintObj.content[0].content[0].content.trim()
  }]
  //ramlObj.resources = [blueprintObj.content[0].content[1]]
  callback(null, ramlObj);
}

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
router.get('/convert', function(req, res, next){
  var file = req.query.file;
  console.log(file)
  if(file.length > 0 || file.indexOf('.apib')<0 || file.indexOf('.md')<0){
    var pathfile = path.join(__dirname, '../../resources/blueprint',file);
    console.log(pathfile);

    fs.readFile(pathfile, 'utf-8', function(error, content){
      if(error)
        next(error)
      else{
        protagonist.parse(content, function(error, data) {
          if (error)
            next(error)
          else{
            //console.log(data);
            blueprintObj2RamlObj(data,function(err, ramlObj){
              if(err)
                next(err)
              else{
                var str = toRAML(ramlObj);
                utils.toFile(pathfile+'.raml',str)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                res.end(str);
                //res.writeHead(200, {"Content-Type": "application/json"});
                //res.end(JSON.stringify(ramlObj,null,2));
              }
            })
          }
        });
      }
    })
  } else {
    res.end('Blueprint File: '+file + ' doesn\'t provided');
  }
});

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
router.get('/', function(req, res, next) {
  res.render('blueprint', { title: 'Blueprint' });
});

module.exports = router;
