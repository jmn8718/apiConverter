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
            //if(blueprint.resourceGroups[index].resources.length > 0) {
            //    var resourceGroup = blueprint.resourceGroups[index].resources
                resources.push(_parseResourceGroup(blueprint.resourceGroups[index]))
                //for(var subindex in resourceGroup)
                //    resources.push(_parseResource(resourceGroup[subindex]))
            //}
        }
    else
        throw "No resources provided"
    return resources
}

function _parseResourceGroup(resource){
    var parentResource = {}
    //console.log(resource)
    parentResource.displayName = resource.name
    parentResource.description = resource.description
    parentResource.resources = []

    for(var index in resource.resources)
        parentResource.resources.push(_parseResource(resource.resources[index]))

    //for(var index in parentResource.resources)
    //    console.log(parentResource.resources[index].relativeUri)

    console.log(_parseRelativeUri(parentResource.resources))

    return parentResource
}

function _parseResource(resourceGroup) {
    //console.log('Parsing resource')
    //console.log(resourceGroup)
    var resource = {}

    resource.displayName = resourceGroup.name
    resource.description = resourceGroup.description
    resource.relativeUri = resourceGroup.uriTemplate
    resource.methods = _parseActions(resourceGroup.actions)
    resource.resources = []

    return resource;

}

function _parseRelativeUri(resources){
    var uris = []
    for(var index in resources){
        uris.push(resources[index].relativeUri)
    }

    console.log(uris)

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

function _getProtocols(baseUri){
    var protocols = []
    if(baseUri.indexOf('HTTPS'))
        protocols.push('HTTPS')
    else if(baseUri.indexOf('HTTP'))
        protocols.push('HTTP')
    return protocols;
}
exports.blueprint2raml = function (blueprint, callback) {
    console.log('blueprint2raml')
    var ramlObj = {}
    try{
        //DEFAULT
        ramlObj.version = '1';
        //ramlObj.securitySchemes = []
        //ramlObj.securedBy = []
        //ramlObj.mediaType = "application/json"
        //ramlObj.resourceTypes = []
        //ramlObj.traits = []

        //FROM OBJ
        ramlObj.title = _getApiName(blueprint);
        ramlObj.baseUri = _getBaseUri(blueprint);
        ramlObj.documentation = _getDocumentation(blueprint)
        ramlObj.protocols = _getProtocols(ramlObj.baseUri)
        ramlObj.resources = _getResources(blueprint)
    } catch(exception){
        callback(new Error(exception))
    }

    callback(null, ramlObj);
}