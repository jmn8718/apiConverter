var apimarket = require('../../src/lib/apimarket-theme')
var assert = require('assert')

var raml2blueprint = require('../../src/lib/raml2blueprint').raml2blueprint;

describe('Test for ApiMarket theme', function(){
    it('should compile a theme',function(done){
        var options = apimarket.getConfig().options[0]
        raml2blueprint('',function(err,blueprint){
            apimarket.render(blueprint,options,function(err, html){
                if(err)
                    console.log(err)
                else
                    console.log(html)
                done()
            })
        })

    })
})