[#ftl]
<div id="api-doc">
	<span class="resizer"><i class="resizer__arrow"></i></span>
	<div class="api__example-console hidden">  
    [@macro_content_action.printConsole/]
	</div>	 
	<section class="api-doc__section">
		<article  id="api-name">
            <section class="api__documentation">
                <h1 class="api__documentation__title">${model.title?upper_case}</h1>
            </section>
            <section class="api__example">
            </section>
        </article>
        <article  id="api-information">
            <section class="api__documentation">
                <h1 class="api__documentation__title">API INFORMATION</h3>
                <table class="api__documentation--table-parameters with_margin-bottom">
                    <tbody>
                    	[#if model.title?has_content]
                        <tr>
                            <td class="with_border-top">Title:</td>
                            <td class="with_border-top">${model.title}</td>
                        </tr>
                        [/#if]
                        [#if model.version?has_content]
                        <tr>
                            <td>Version:</td>
                            <td>${model.version?html} </td>
                        </tr>
                        [/#if]
                        [#if model.protocols?has_content]
                        <tr>
                            <td>Protocols:</td>
                            <td>[#list model.protocols as protocol]${protocol}[/#list]</td>
                        </tr>
                        [/#if]
                        [#if model.uri?has_content]
                        <tr>
                            <td>URI:</td>
                            <td>${model.uri?html}</td>
                        </tr>
                        [/#if]
                    </tbody>
                </table>
            </section>
            <section class="api__example api__example--place-holder">
                <p class="place-holder place-holder--title">example screen</p>

                <p class="place-holder place-holder--text">No examples are available on this section</p>

                <p class="place-holder place-holder--text">Navigate to any service to show its associated examples</p>
            </section>
        </article>
        
        [#if model.documentation?has_content]
        	[#list model.documentation as document]
        	[@macro_documentation.printDocumentation document/]
        	[/#list]
        [/#if]
        [#list model.resources as resource]
		[@macro_content_resource.printContentResource resource model.uri/]
		[/#list]
	</section>
</div>