var fs = require('fs')
var path = require('path')
var pug = require('pug');

var markdown = require('markdown-it')
var querystring = require('querystring')
var highlight = require('highlight.js')

// Get the theme's configuration options
exports.getConfig = function () {
    return {
        // This is a list of all supported API Blueprint format versions
        formats: ['1A'],
        // This is a list of all options your theme accepts. See
        // here for more: https://github.com/bcoe/yargs#readme
        // Note: These get prefixed with `theme` when you access
        // them in the options object later!
        options: [
            {
                name: 'apimarket-theme',
                description: 'Theme for apimarket',
                default: 'apimarket'
            }
        ]
    };
}

// Asyncronously render out a string
exports.render = function (input, options, done) {
    console.log(options)
    // Normally you would use some template engine here.
    // To keep this code really simple, we just print
    // out a string and ignore the API Blueprint.
    var md = markdown({
        html: true,
        linkify: true,
        typographer: true,
        highlight: highlight
    })
    var options = {
        self: true,
        pretty: true,
        fullWidth: true,
        api: input,
        urldec: function(value){
            return  querystring.unescape(value)
        },
        markdown: function(content){
            return md.render(content)
        }
    }

    //local = {
    //    api: input,
    //    urldec: function(value){
    //        return  querystring.unescape(value)
    //    }
    //}

    var templatePath = path.join(__dirname , '..','templates','pug-default.pug')
    var templatePath = path.join(__dirname , '..','templates','index.pug')
    console.log(templatePath)
    var html = pug.renderFile(templatePath, options);
    done(null, html);
};