[#ftl]
[#macro printContentResource resource baseUri] 
<article  id="resource-${resource.id?html}">
	<section class="api__documentation">
        <h1 class="api__documentation__title">${resource.displayName?upper_case}</h1>
		[#if resource.description?has_content]
		<div class="md-item">
			${resource.description?html}
		</div> 
		[#else]
		<div>
			-- MISSING DESCRIPTION -- 
		</div> 
		[/#if]
	</section>
    <section class="api__example">
    </section>
</article>
	[#if resource.actions?has_content]
		[#list resource.actions as action]
			[@macro_content_action.printContentAction action resource.uri resource.id baseUri/]		
		[/#list]
	[/#if]
	[#if resource.resources?has_content]
		[#list resource.resources as subresource]
			[@macro_content_resource.printContentResource subresource baseUri/]
		[/#list]
	[/#if]
[/#macro]    	