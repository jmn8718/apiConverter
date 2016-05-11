var fs = require('fs');

exports.toFile = function (filePath, content){
    console.log('toFile')
    var options = { encoding: 'utf-8' };
    var wstream = fs.createWriteStream(filePath, options);
    wstream.write(content);
    wstream.end();
    console.log('done')
}