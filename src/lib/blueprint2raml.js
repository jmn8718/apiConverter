function _getApiName(blueprint){
    if(blueprint.name !== undefined && blueprint.name.length > 0)
        return blueprint.name;
    throw "API Name not provided";
}

function _getDocumentation(blueprint) {
    if(blueprint.description !== null && blueprint.description.length>0)
        return [{
            title: '',
            content: blueprint.description.trim()
        }]
    else
        return undefined;
}

function _getBaseUri(blueprint) {
    if(blueprint.metadata !== undefined && blueprint.metadata.length >0){
        for(var index in blueprint.metadata){
            if(blueprint.metadata[index].name === "HOST")
                return blueprint.metadata[index].value
        }
        throw "No HOST provided"
    } else {
        throw "No metadata provided";
    }
}

function _getResources(blueprint) {
    var resources = []
    if(blueprint.resourceGroups !== null && blueprint.resourceGroups.length>0)
        for(var index in blueprint.resourceGroups){
            if(blueprint.resourceGroups[index].resources.length > 0) {
                var resourceGroup = blueprint.resourceGroups[index].resources
                for(var subindex in resourceGroup)
                    resources.push(_parseResourceGroup(resourceGroup[subindex]))
            }
        }
    else
        throw "No resources provided"
    return resources
}

function _parseResourceGroup(resourceGroup) {
    console.log('Parsing resource')
    var resource = {}

    resource.displayName = resourceGroup.name
    resource.description = resourceGroup.description
    resource.relativeUri = resourceGroup.uriTemplate
    resource.methods = _parseActions(resourceGroup.actions)
    resource.resources = []

    return resource;

}

function _parseActions(actions){
    var parsedActions = []
    for(var index in actions){
        var action = {}
        action.method = actions[index].method
        action.displayName = actions[index].name
        action.description = actions[index].description
        action.responses = []
        parsedActions.push(action)
    }
    return parsedActions
}
exports.blueprint2raml = function (blueprint, callback) {
    console.log('blueprint2raml')
    var ramlObj = {}
    try{
        //DEFAULT
        ramlObj.version = 'v1';
        ramlObj.protocols = ['HTTP']
        //ramlObj.securitySchemes = []
        //ramlObj.securedBy = []
        //ramlObj.mediaType = "application/json"
        //ramlObj.resourceTypes = []
        //ramlObj.traits = []
        ramlObj.resources = _getResources(blueprint)

        //FROM OBJ
        ramlObj.title = _getApiName(blueprint);
        ramlObj.baseUri = _getBaseUri(blueprint);
        ramlObj.documentation = _getDocumentation(blueprint)
    } catch(exception){
        callback(new Error(exception))
    }

    callback(null, ramlObj);
}