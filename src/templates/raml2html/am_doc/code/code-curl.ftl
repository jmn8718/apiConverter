[#ftl]
[#macro generateBody action baseUri]
curl -X ${action.type?upper_case} "${baseUri}${action.resolvedUri}" \ 
  --data @/path/to/file/with/body.json \
[#if action.headerParameters?has_content]
	[#list action.headerParameters as header]
		[#if header.display?has_content]
  -H "${header.name}: ${header.display?trim}" \
		[#else]
-------MISSING DISPLAY--------
		[/#if] 
	[/#list]
[/#if]
  -v
[/#macro]

[#macro generateNobody action baseUri]
curl -X ${action.type?upper_case} "${baseUri}${action.resolvedUri}" \ 
[#if action.headerParameters?has_content]
	[#list action.headerParameters as header]
		[#if header.display?has_content]
  -H "${header.name}: ${header.display?trim}" \
		[#else]
-------MISSING DISPLAY--------
		[/#if] 
	[/#list]
[/#if]
  -v 
[/#macro]