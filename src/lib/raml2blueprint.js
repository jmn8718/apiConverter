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
        "resourceGroups": [
            {
                "name": "",
                "description": "",
                "resources": [
                    {
                        "element": "resource",
                        "name": "Questions Collection",
                        "description": "",
                        "uriTemplate": "/questions",
                        "model": {},
                        "parameters": [],
                        "actions": [
                            {
                                "name": "List All Questions",
                                "description": "",
                                "method": "GET",
                                "parameters": [],
                                "attributes": {
                                    "relation": "",
                                    "uriTemplate": ""
                                },
                                "content": [],
                                "examples": [
                                    {
                                        "name": "",
                                        "description": "",
                                        "requests": [],
                                        "responses": [
                                            {
                                                "name": "200",
                                                "description": "",
                                                "headers": [
                                                    {
                                                        "name": "Content-Type",
                                                        "value": "application/json"
                                                    }
                                                ],
                                                "body": "[\n    {\n        \"question\": \"Favourite programming language?\",\n        \"published_at\": \"2015-08-05T08:40:51.620Z\",\n        \"choices\": [\n            {\n                \"choice\": \"Swift\",\n                \"votes\": 2048\n            }, {\n                \"choice\": \"Python\",\n                \"votes\": 1024\n            }, {\n                \"choice\": \"Objective-C\",\n                \"votes\": 512\n            }, {\n                \"choice\": \"Ruby\",\n                \"votes\": 256\n            }\n        ]\n    }\n]\n",
                                                "schema": "",
                                                "content": [
                                                    {
                                                        "element": "asset",
                                                        "attributes": {
                                                            "role": "bodyExample"
                                                        },
                                                        "content": "[\n    {\n        \"question\": \"Favourite programming language?\",\n        \"published_at\": \"2015-08-05T08:40:51.620Z\",\n        \"choices\": [\n            {\n                \"choice\": \"Swift\",\n                \"votes\": 2048\n            }, {\n                \"choice\": \"Python\",\n                \"votes\": 1024\n            }, {\n                \"choice\": \"Objective-C\",\n                \"votes\": 512\n            }, {\n                \"choice\": \"Ruby\",\n                \"votes\": 256\n            }\n        ]\n    }\n]\n"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "Create a New Question",
                                "description": "You may create your own question using this action. It takes a JSON\nobject containing a question and a collection of answers in the\nform of choices.\n\n",
                                "method": "POST",
                                "parameters": [],
                                "attributes": {
                                    "relation": "",
                                    "uriTemplate": ""
                                },
                                "content": [],
                                "examples": [
                                    {
                                        "name": "",
                                        "description": "",
                                        "requests": [
                                            {
                                                "name": "",
                                                "description": "",
                                                "headers": [
                                                    {
                                                        "name": "Content-Type",
                                                        "value": "application/json"
                                                    }
                                                ],
                                                "body": "{\n    \"question\": \"Favourite programming language?\",\n    \"choices\": [\n        \"Swift\",\n        \"Python\",\n        \"Objective-C\",\n        \"Ruby\"\n    ]\n}\n",
                                                "schema": "",
                                                "content": [
                                                    {
                                                        "element": "asset",
                                                        "attributes": {
                                                            "role": "bodyExample"
                                                        },
                                                        "content": "{\n    \"question\": \"Favourite programming language?\",\n    \"choices\": [\n        \"Swift\",\n        \"Python\",\n        \"Objective-C\",\n        \"Ruby\"\n    ]\n}\n"
                                                    }
                                                ]
                                            }
                                        ],
                                        "responses": [
                                            {
                                                "name": "201",
                                                "description": "",
                                                "headers": [
                                                    {
                                                        "name": "Content-Type",
                                                        "value": "application/json"
                                                    },
                                                    {
                                                        "name": "Location",
                                                        "value": "/questions/2"
                                                    }
                                                ],
                                                "body": "{\n    \"question\": \"Favourite programming language?\",\n    \"published_at\": \"2015-08-05T08:40:51.620Z\",\n    \"choices\": [\n        {\n            \"choice\": \"Swift\",\n            \"votes\": 0\n        }, {\n            \"choice\": \"Python\",\n            \"votes\": 0\n        }, {\n            \"choice\": \"Objective-C\",\n            \"votes\": 0\n        }, {\n            \"choice\": \"Ruby\",\n            \"votes\": 0\n        }\n    ]\n}\n",
                                                "schema": "",
                                                "content": [
                                                    {
                                                        "element": "asset",
                                                        "attributes": {
                                                            "role": "bodyExample"
                                                        },
                                                        "content": "{\n    \"question\": \"Favourite programming language?\",\n    \"published_at\": \"2015-08-05T08:40:51.620Z\",\n    \"choices\": [\n        {\n            \"choice\": \"Swift\",\n            \"votes\": 0\n        }, {\n            \"choice\": \"Python\",\n            \"votes\": 0\n        }, {\n            \"choice\": \"Objective-C\",\n            \"votes\": 0\n        }, {\n            \"choice\": \"Ruby\",\n            \"votes\": 0\n        }\n    ]\n}\n"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "content": []
                    }
                ]
            }
        ],
        "content": [
            {
                "element": "category",
                "content": [
                    {
                        "element": "resource",
                        "name": "Questions Collection",
                        "description": "",
                        "uriTemplate": "/questions",
                        "model": {},
                        "parameters": [],
                        "actions": [
                            {
                                "name": "List All Questions",
                                "description": "",
                                "method": "GET",
                                "parameters": [],
                                "attributes": {
                                    "relation": "",
                                    "uriTemplate": ""
                                },
                                "content": [],
                                "examples": [
                                    {
                                        "name": "",
                                        "description": "",
                                        "requests": [],
                                        "responses": [
                                            {
                                                "name": "200",
                                                "description": "",
                                                "headers": [
                                                    {
                                                        "name": "Content-Type",
                                                        "value": "application/json"
                                                    }
                                                ],
                                                "body": "[\n    {\n        \"question\": \"Favourite programming language?\",\n        \"published_at\": \"2015-08-05T08:40:51.620Z\",\n        \"choices\": [\n            {\n                \"choice\": \"Swift\",\n                \"votes\": 2048\n            }, {\n                \"choice\": \"Python\",\n                \"votes\": 1024\n            }, {\n                \"choice\": \"Objective-C\",\n                \"votes\": 512\n            }, {\n                \"choice\": \"Ruby\",\n                \"votes\": 256\n            }\n        ]\n    }\n]\n",
                                                "schema": "",
                                                "content": [
                                                    {
                                                        "element": "asset",
                                                        "attributes": {
                                                            "role": "bodyExample"
                                                        },
                                                        "content": "[\n    {\n        \"question\": \"Favourite programming language?\",\n        \"published_at\": \"2015-08-05T08:40:51.620Z\",\n        \"choices\": [\n            {\n                \"choice\": \"Swift\",\n                \"votes\": 2048\n            }, {\n                \"choice\": \"Python\",\n                \"votes\": 1024\n            }, {\n                \"choice\": \"Objective-C\",\n                \"votes\": 512\n            }, {\n                \"choice\": \"Ruby\",\n                \"votes\": 256\n            }\n        ]\n    }\n]\n"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                "name": "Create a New Question",
                                "description": "You may create your own question using this action. It takes a JSON\nobject containing a question and a collection of answers in the\nform of choices.\n\n",
                                "method": "POST",
                                "parameters": [],
                                "attributes": {
                                    "relation": "",
                                    "uriTemplate": ""
                                },
                                "content": [],
                                "examples": [
                                    {
                                        "name": "",
                                        "description": "",
                                        "requests": [
                                            {
                                                "name": "",
                                                "description": "",
                                                "headers": [
                                                    {
                                                        "name": "Content-Type",
                                                        "value": "application/json"
                                                    }
                                                ],
                                                "body": "{\n    \"question\": \"Favourite programming language?\",\n    \"choices\": [\n        \"Swift\",\n        \"Python\",\n        \"Objective-C\",\n        \"Ruby\"\n    ]\n}\n",
                                                "schema": "",
                                                "content": [
                                                    {
                                                        "element": "asset",
                                                        "attributes": {
                                                            "role": "bodyExample"
                                                        },
                                                        "content": "{\n    \"question\": \"Favourite programming language?\",\n    \"choices\": [\n        \"Swift\",\n        \"Python\",\n        \"Objective-C\",\n        \"Ruby\"\n    ]\n}\n"
                                                    }
                                                ]
                                            }
                                        ],
                                        "responses": [
                                            {
                                                "name": "201",
                                                "description": "",
                                                "headers": [
                                                    {
                                                        "name": "Content-Type",
                                                        "value": "application/json"
                                                    },
                                                    {
                                                        "name": "Location",
                                                        "value": "/questions/2"
                                                    }
                                                ],
                                                "body": "{\n    \"question\": \"Favourite programming language?\",\n    \"published_at\": \"2015-08-05T08:40:51.620Z\",\n    \"choices\": [\n        {\n            \"choice\": \"Swift\",\n            \"votes\": 0\n        }, {\n            \"choice\": \"Python\",\n            \"votes\": 0\n        }, {\n            \"choice\": \"Objective-C\",\n            \"votes\": 0\n        }, {\n            \"choice\": \"Ruby\",\n            \"votes\": 0\n        }\n    ]\n}\n",
                                                "schema": "",
                                                "content": [
                                                    {
                                                        "element": "asset",
                                                        "attributes": {
                                                            "role": "bodyExample"
                                                        },
                                                        "content": "{\n    \"question\": \"Favourite programming language?\",\n    \"published_at\": \"2015-08-05T08:40:51.620Z\",\n    \"choices\": [\n        {\n            \"choice\": \"Swift\",\n            \"votes\": 0\n        }, {\n            \"choice\": \"Python\",\n            \"votes\": 0\n        }, {\n            \"choice\": \"Objective-C\",\n            \"votes\": 0\n        }, {\n            \"choice\": \"Ruby\",\n            \"votes\": 0\n        }\n    ]\n}\n"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "content": []
                    }
                ]
            }
        ]
    };



    callback(null, blueprintObj)
    //callback(null, _prepareBlueprintObject(blueprintObj))
}