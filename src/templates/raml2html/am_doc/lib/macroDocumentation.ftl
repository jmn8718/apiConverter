[#ftl]
[#macro printDocumentation documentation]
<article  id="api-information">
    <section class="api__documentation">
    	<h1 class="api__documentation__title">${documentation.title?upper_case}</h1>                
        <div class="highlight-block md-item">
            [#if documentation.content?has_content]
            ${documentation.content}
            [#else]
            -- MISSING DESCRIPTION --
            [/#if]
        </div>
    </section>
    <section class="api__example api__example--place-holder" id="documentation-${documentation.id}">
    </section>
</article>
[/#macro]