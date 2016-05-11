var fs = require('fs');
var minify = require('html-minifier').minify;

exports.toFile = function (filePath, content){
    console.log('toFile');
    var options = { encoding: 'utf-8' };
    var wstream = fs.createWriteStream(filePath, options);
    wstream.write(content);
    wstream.end();
    console.log('done')
}

exports.toMinifiedFile = function (filePath, content){
    console.log('toMinifiedFile');
    var result = minify(content, {
        minifyJS: true,
        minifyCSS: true,
        //collapseWhitespace: true,
        //preserveLineBreaks: true,
        removeAttributeQuotes: true
    });

    var options = { encoding: 'utf-8' };
    var wstream = fs.createWriteStream(filePath, options);
    wstream.write(result);
    wstream.end();
    console.log('done')
}

exports.blueprint2RamlObj = function(blueprintObj, callback){
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