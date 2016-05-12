function _prepareBlueprintObject(blueprintObj){
    return {
        "_version": "2.2",
        "ast": blueprintObj
    }
}

exports.raml2blueprint = function(ramlObj, callback){
    var blueprintObj = {
        "_version": "4.0",
        "metadata": [
            {
                "name": "FORMAT",
                "value": "1A"
            },
            {
                "name": "HOST",
                "value": "http://polls.apiblueprint.org/"
            }
        ],
        "name": "Polls API",
        "description": "Polls is a simple API allowing consumers to view polls and vote in them.\n\n",
        "element": "category",
        "resourceGroups": []

    };



    callback(null, _prepareBlueprintObject(blueprintObj))
}