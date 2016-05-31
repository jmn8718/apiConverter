<div id="sidebar">
    <div id="nav-anchor">&nbsp;</div>
    <div class="nav-wrapper-scroll">
        <nav class="nav">
            <ul class="nav__list">
				<li class="nav__list__item">
					<a class="nav__list__link nav__list__link--active" href="#api-name" title="API Name">${model.title}</a>
					<!--<span class="api_market__tooltip nav__list__link__tooltip">API Information</span>-->
					<ul class="nav__list nav__list--sub-list">
						<li class="nav__list__item">
							<a class="nav__list__link nav__list__link-sublink" href="#api-information" title="API Information">API Information</a>
							<!--<span class="api_market__tooltip nav__list__link__tooltip">description</span>-->
						</li>
					[#if model.documentation?has_content]
						[#list model.documentation as item]
						<li class="nav__list__item">
							<a class="nav__list__link nav__list__link-sublink" href="#documentation-${item.id}" title="${item.title?html}">${item.title?html}</a>
							<!--<span class="api_market__tooltip nav__list__link__tooltip">${item.title?html}</span>-->
						</li>
						[/#list]
					[/#if]
					</ul>
				</li>
				
				[#list model.resources as resource]
				[@macro_sidebar_resource.printSidebarResource resource/]
				[/#list]
            </ul>
        </nav>
    </div>
</div>