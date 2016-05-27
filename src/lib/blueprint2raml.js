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
    //parentResource.displayName = resource.name
    //parentResource.description = resource.description
    parentResource.resources = []

    for(var index in resource.resources)
        parentResource.resources.push(_parseResource(resource.resources[index]))

    //for(var index in parentResource.resources)
    //    console.log(parentResource.resources[index].relativeUri)

    // console.log(_parseRelativeUri(parentResource.resources))

    return parentResource
}

function _parseResource(resourceGroup) {
    //console.log('Parsing resource')
    //console.log(resourceGroup)
    var resource = {}

    resource.displayName = resourceGroup.name
    resource.description = resourceGroup.description
    if(resource.description.length>0)
        resource.description = resource.description.trim()
    resource.relativeUri = resourceGroup.uriTemplate

    if(resourceGroup.parameters!== undefined && resourceGroup.parameters.length > 0){
        // console.log(resourceGroup.parameters)
        resource.uriParameters = _parseUriParameters(resourceGroup.parameters, resource.relativeUri)
        // console.log('uri',resource.uriParameters)
        resource.queryParameters = _parseQueryParameters(resourceGroup.parameters, resource.relativeUri)
        // console.log('query',resource.queryParameters)
    }

    if(resource.relativeUri!== undefined && resource.relativeUri.length >0 && resource.relativeUri.indexOf('{?')>0)
        resource.relativeUri = resource.relativeUri.substring(0,resource.relativeUri.indexOf('{?'))

    resource.methods = _parseActions(resourceGroup.actions,resource.queryParameters)
    // console.log(resourceGroup['resources'],'\n\n')
    // resource.resources = resourceGroup['resources']

    return resource;

}

function _parseRelativeUri(resources){
    var uris = []
    for(var index in resources){
        uris.push(resources[index].relativeUri)
    }

    // console.log(uris)

}

function _parseActions(actions,queryParameters){
    var parsedActions = []
    for(var index in actions){
        var action = {}
        if(queryParameters !== undefined && queryParameters != {})
            action.queryParameters = queryParameters
        action.method = actions[index].method
        action.displayName = actions[index].name
        action.description = actions[index].description
        if(action.description.length>0)
            action.description = action.description.trim()
        if(actions[index]['examples']!==undefined){
            action.headers = _parseRequestHeaders(actions[index])
            action.body = _parseRequest(actions[index])
            action.responses = _parseResponses(actions[index])
        }

        parsedActions.push(action)
    }
    // console.log('parsedActions',parsedActions)
    return parsedActions
}

function _parseQueryParameters(parameters, uri){
    var queryParametersString, queryParametersArray;
    if(uri.indexOf('{?')>0){
        queryParametersString = uri.substr(uri.indexOf('{?'))
        queryParametersString= queryParametersString.replace('{?','').replace('}','')
        queryParametersArray = queryParametersString.split(',')
    } else
        return undefined;


    var queryParameters = {}
    for(var index in parameters){
        var parameter = parameters[index];
        if(queryParametersArray.indexOf(parameter['name']) != -1){
            queryParameters[parameter['name']] = {
                "description": parameter['description'],
                "example": parameter['example'],
                "displayName": parameter['name'],
                "values": parameter['values'],
                "default": parameter['default'],
                "type":parameter['type']
            }
        }
        
    }
    return (Object.keys(queryParameters).length > 0 ) ? queryParameters : undefined;
}

function _parseUriParameters(parameters, uri){
    var uriParameters = {}
    for(var index in parameters){
        var parameter = parameters[index];
        if(uri.indexOf('{'+parameter['name']+'}')>0)
            uriParameters[parameter['name']] = {
                "description": parameter['description'],
                "example": parameter['example'],
                "displayName": parameter['name'],
                "values": parameter['values'],
                "default": parameter['default'],
                "type":parameter['type']
            }
    }

    return (Object.keys(uriParameters).length > 0) ? uriParameters : undefined;
}

function _parseRequestHeaders(action){
    var headers = {}
    var actionRequest = action.examples[0]['requests'] || []

    if(actionRequest.length === 0)
        return undefined
    else{
        var actionRequestData = actionRequest[0]
        if(actionRequestData['headers']!==undefined && actionRequestData['headers'].length > 0){
            for(var index in actionRequestData['headers']){
                var header = actionRequestData['headers'][index]
                headers[header['name']] = {
                    "displayName": header['name'],
                    "required": true,
                    "type": "String",
                    "default":  header['value']
                }
            }
        } else
            return undefined
    }
    return headers;
}

function _parseRequest(action){
    var resquest = {}
    var actionRequest = action.examples[0]['requests'] || []

    if(actionRequest.length === 0)
        return undefined
    else{
        var actionRequestData = actionRequest[0]
        var type = ''
        if(actionRequestData['body']!==undefined && actionRequestData['body'].length > 0)
            type = "application/json"
        else
            return undefined
        var example = actionRequestData['body']
        resquest[type] = {
            'example':example
        }
    }
    return resquest;
}

function _parseResponses(action){
    var responses = {}
    var actionResponses = action.examples[0]['responses']
    if(actionResponses.length === 0)
        return undefined;
    else{
        for(var index in actionResponses){
            console.log( actionResponses[index])
            var code = actionResponses[index]['name']
            var description = actionResponses[index]['description']
            var type = ''
            var value = ''
            if(actionResponses[index]['headers'].length > 0){
                for(var indexHeader in actionResponses[index]['headers']){
                    if(actionResponses[index]['headers'][index]['name'].toLowerCase() === 'content-type'){
                        type = actionResponses[index]['headers'][index]['type']
                        value = actionResponses[index]['headers'][index]['value']

                    }
                    else if(actionResponses[index]['headers'][index]['name'].toLowerCase() === 'location'){
                        type = actionResponses[index]['headers'][index]['name']
                        value = actionResponses[index]['headers'][index]['value']
                    }
                }
            }
            var example = actionResponses[index]['body']
            if(example===undefined)
                example = ""
            var schema = actionResponses[index]['schema']
            if(schema===undefined)
                schema = ""
            responses[code]= {}
            responses[code]['description']= description
            if(type.length > 0){
                if(type.toLowerCase() === 'content-type'){
                    responses[code]['body'] = {}
                    responses[code]['body'][type] = {}
                    if(example.length > 0)
                        responses[code]['body'][type]['example'] = example
                    if(schema.length > 0)
                        responses[code]['body'][type]['schema'] = schema
                }
                if(type.toLowerCase() === 'location'){
                    responses[code]['Headers'] = {}
                    responses[code]['Headers'][type] = value;
                }
            }
        }
    }
    return responses;
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