var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var protagonist = require('protagonist');
var aglio = require('aglio');

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


router.get('/', function(req, res, next) {
  res.render('blueprint', { title: 'Blueprint' });
});

module.exports = router;
