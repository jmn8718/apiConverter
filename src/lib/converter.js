exports.convert = function (filename, content, next){
    console.log('Convert');
    console.log('Filename:',filename)
    console.log('Content:',content)
    next(undefined, content)
}