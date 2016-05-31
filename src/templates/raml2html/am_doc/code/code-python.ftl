[#ftl]
[#macro generateBody action baseUri]
import urllib
import httplib

qparams = {}
parqparams = urllib.urlencode(qparams)

body = { body: "goes here"}

conn = httplib.HTTPSConnection('${baseUri}')

headers = {}
[#if action.headerParameters?has_content]
	[#list action.headerParameters as header]
		[#if header.display?has_content]
headers["${header.name}"] = "${header.display?trim}"
		[#else]
-------MISSING DISPLAY--------
		[/#if] 
	[/#list]
[/#if]

conn.request('${action.type?upper_case}', '${action.resolvedUri}?%s'%parqparams, body, headers)

r = conn.getresponse()

print r.status, r.read()
[/#macro]

[#macro generateNobody action baseUri]
import urllib
import httplib

qparams = {}
parqparams = urllib.urlencode(qparams)

conn = httplib.HTTPSConnection('${baseUri}')

headers = {}
[#if action.headerParameters?has_content]
	[#list action.headerParameters as header]
		[#if header.display?has_content]
headers["${header.name}"] = "${header.display?trim}"
		[#else]
-------MISSING DISPLAY--------
		[/#if] 
	[/#list]
[/#if]

conn.request('${action.type?upper_case}', '${action.resolvedUri}?%s'%parqparams, None, headers)

r = conn.getresponse()

print r.status, r.read()
[/#macro]