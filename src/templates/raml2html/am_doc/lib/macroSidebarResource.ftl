[#ftl]
[#macro printSidebarResource resource] 
<li class="nav__list__item">
    <a class="nav__list__link" href="#resource-${resource.id?lower_case}" title="${resource.displayName?html}">${resource.displayName?html}</a>
    <!--<span class="api_market__tooltip nav__list__link__tooltip">${resource.displayName?html}</span>-->
    <ul class="nav__list nav__list--sub-list">
    [#if resource.actions?has_content]
    	
    	[#list resource.actions as action]
    	<li class="nav__list__item">
			<span class="nav__list__icon">
				<strong class="api__documentation__http api__documentation__http--${action.type?lower_case}">
    				[#if action.type?lower_case == "delete"]
    					${action.type[0..2]?lower_case}
	    			[#else]
	    				${action.type?lower_case}
	    			[/#if]	
    			</strong>
			</span>
			<a class="nav__list__link nav__list__link-method" href="#action-${resource.id}-${action.type?lower_case}" title="${resource.uri?html}">${resource.uri?html}</a>
			<!--<span class="api_market__tooltip nav__list__link__tooltip">${resource.relativeUri?html}</span>-->
		</li>
		[/#list]
						    
	[/#if]
	</ul>				    
</li>
[#if resource.resources?has_content]
	[#list resource.resources as subresource]
		[@macro_sidebar_resource.printSidebarResource subresource/]
	[/#list]
[/#if]
[/#macro]
