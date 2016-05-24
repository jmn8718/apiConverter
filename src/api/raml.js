var express = require('express');
var router = express.Router();
var path = require('path');

var raml = require('raml-parser');
var raml2html = require('raml2html');
var toRAML = require('raml-object-to-raml');

var utils = require('../lib/utils')

router.get('/parser', function(req, res, next) {
  var file = req.query.file;
  if(file.length > 0 || file.indexOf('.raml')<0){
    var pathfile = path.join(__dirname, '../../resources/raml',file);
    console.log(pathfile);

    raml.loadFile(pathfile).then(function(data) {
      //console.log(data)
      utils.toFile(pathfile+'.json',JSON.stringify(data,null,2))
      res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
      res.end(JSON.stringify(data,null,2))
    }, function(error) {
      next(error)
    });

  } else {
    res.end('Raml File: '+file + ' doesn\'t provided');
  }
});

router.get('/raml2html', function(req, res, next) {
  var file = req.query.file;
  if(file.length > 0 || file.indexOf('.raml')<0){
    var pathfile = path.join(__dirname, '../../resources/raml',file);
    console.log(pathfile);

    raml.loadFile(pathfile).then(function(data) {
      var configWithDefaultTemplates = raml2html.getDefaultConfig();
      raml2html.render(data,configWithDefaultTemplates).then(function(result) {
        //console.log(result)
        utils.toMinifiedFile(pathfile+'.html',result);
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(result);
      }, function(error) {
        next(error)
      });
    }, function(error) {
      next(error)
    });

  } else {
    res.end('Raml File: '+file + ' doesn\'t provided');
  }
});

router.get('/blueprint2html', function(req, res, next) {
  var file = req.query.file;
  if(file.length > 0 || file.indexOf('.raml')<0){
    var pathfile = path.join(__dirname, '../../resources/blueprint',file);
    console.log(pathfile);

    raml.loadFile(pathfile).then(function(data) {
      var configWithDefaultTemplates = raml2html.getDefaultConfig();
      raml2html.render(data,configWithDefaultTemplates).then(function(result) {
        //console.log(result)
        utils.toMinifiedFile(pathfile+'.html',result);
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.end(result);
      }, function(error) {
        next(error)
      });
    }, function(error) {
      next(error)
    });

  } else {
    res.end('Raml File: '+file + ' doesn\'t provided');
  }
});

router.get('/toRaml', function(req, res, next) {
  var file = req.query.file;
  if(file.length > 0 || file.indexOf('.raml')<0){
    var pathfile = path.join(__dirname, '../../resources/raml',file);
    console.log(pathfile);

    raml.loadFile(pathfile).then(function(data) {
      console.log(JSON.stringify(data))
      var str = toRAML(data);
      res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
      res.end(JSON.stringify(data,null,2))
    }, function(error) {
      next(error)
    });

  } else {
    res.end('Raml File: '+file + ' doesn\'t provided');
  }
});
router.get('/', function(req, res, next) {
  res.render('raml', { title: 'Raml' });
});

module.exports = router;
