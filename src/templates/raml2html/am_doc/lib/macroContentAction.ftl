[#ftl]
[#macro printContentAction action path id baseUri] 
<article id="action-${id}-${action.type?lower_case}">
    <section class="api__documentation">   	
	    <div class="api__documentation__title-action row">
	    	<div class="col-amkt col-amkt-10">
	    		<h1 class="api__documentation__title">
	    			<label id="">${path?lower_case}</label> 
	    			<a class="api-console__icon__link--switch action-console" data-console-id="action-${id}-${action.type?lower_case}"></a>
	    		</h1> 
        		
	    	</div>	    
        	<div class="col-amkt col-amkt-2">
		        <span class="api__documentation__icon">
		        	<strong class="api__documentation__http api__documentation__http--${action.type?lower_case}">
		        		[#if action.type?lower_case == "delete"]
	    					${action.type[0..2]?lower_case}
		    			[#else]
		    				${action.type?lower_case}
		    			[/#if]	
		    		</strong> 
	        	</span>
        	</div>
	    </div>
	    [#if action.description?has_content]
	    	<div class="md-item">
                ${action.description?html}
            </div>
	    [#else]
	    	<div class="api__documentation__text">
                -- MISSING DESCRIPTION --
            </div>
	    [/#if]
	    
	    [#if action.uriParameters?has_content]	    
	    	[@macro_content_action.printParameters "Uri" action.uriParameters/]	   
	    [/#if]
	    
	    [#if action.headerParameters?has_content]	    
	    	[@macro_content_action.printParameters "Header" action.headerParameters/]	 
	    [/#if]
	    
	    [#if action.queryParameters?has_content]	    
	    	[@macro_content_action.printParameters "Query" action.queryParameters/]
	    [/#if]
    </section>
    <section class="api__example">
    	<div class="api__example_header-bar">
    		<!-- Passing needed action id -->
			<a class="api__example_header-bar_action action-console" data-console-id="action-${id}-${action.type?lower_case}" href="#">Switch to console</a>
		</div>
    	<h1 class="api__documentation__title api__documentation__title__example">${path?lower_case}</h1>
    	
        <h2 class="api__documentation__subtitle">EXAMPLE</h2>
        [@macro_content_action.printExamples action baseUri path/]
        
        [#if action.requests?has_content]
        	<div class="example__info">
        		<h2 class="api__documentation__subtitle">REQUEST</h2>
        		[#list action.requests as request]
	        		[#if request.contentType?has_content]
	        		<div class="example__info__col example__info__col-full">
	                    <span class="example__info__block">
	                        <label class="example__info__text">Content-type : ${request.contentType?html} </label>
	                    </span>
	                </div>	        			
	        		[#else]
	        		<div class="examples-container">
	                    	<pre class="example-code_container">[#t]
	                    		<code class="language-json hljs">[#t]-- CONTENT TYPE MISSING --[#rt]</code> 
	                    [#t]</pre>
	                </div>
	        		[/#if]
    				
    				[#if request.schema?has_content]
    					<h3 class="api__documentation__subtitle_section">SCHEMA</h3>
	                	<div class="examples-container">
	                    	<pre class="example-code_container">[#t]
	                    		<code class="language-json">[#t]${request.schema?trim}[#rt]</code>
	                    	[#t]</pre>
	                	</div>
    				[#else]
    					<!-- <pre class="example-code_container"><code class="language-json hljs text-center">  NO SCHEMA </code></pre>-->
    				[/#if]
        			[#if request.example?has_content]
	    				<h3 class="api__documentation__subtitle_status-code">Example</h3>
	                	<div class="examples-container">
	                    	<pre class="example-code_container">[#t]
	                    		<code class="language-json hljs">[#t]${request.example?trim}[#rt]</code> 
	                    	[#t]</pre>
	                	</div>
    				[#else]
    				<div class="examples-container">
	                    	<pre class="example-code_container">[#t]
	                    		<code class="language-json hljs">[#t]-- NO EXAMPLE --[#rt]</code> 
	                    [#t]</pre>
	                </div>
    				[/#if]
        		[/#list]
        	</div>
	    [/#if]
	    [#if action.responses?has_content]
	    <h2 class="api__documentation__subtitle">RESPONSE</h2>
	    <h3 class="api__documentation__subtitle_section">HTTP status code</h3>
	    <div class="example__status-codes">
            <div class="example__status-codes-wrapper">
	    	[#list action.responses as response]
	    	 	<span class="example__status-code example__status-code example__status-code__${response.code}-${response.id}">${response.code}</span>
	    	[/#list]
	    	</div>
	    	[#list action.responses as response]
	    	<div class="example__info example__status-code__${response.code}-${response.id} hidden">
				[#if response.description?has_content]
                 <div class="md-item">
                     ${response.description}
                 </div>
				[/#if]
				<h3 class="api__documentation__subtitle_section">BODY</h3>
	
				[#if response.schema?has_content]
					<div class="example__info__col">
	                    <span class="example__info__block">
	                        <label class="example__info__text">Schema: </label>
	                    </span>
	                </div>								
	                <div class="examples-container example__response--${response.code} hidden">
	                 	 <pre class="example-code_container">[#t]
		                 	 <code class="language-json hljs">[#t]${response.schema?trim}[#rt]</code>
		                 [#t]</pre>
	                </div>
                [#else]
                	<!--<pre class="example-code_container">
                	 	<code class="language-json hljs text-center">-- NO SCHEMA --</code>
					</pre>-->
				[/#if]
                <div class="example__info__col">
                    <span class="example__info__block">
                        <label class="example__info__text">Example: </label>
                    </span>
                </div>
                <div class="example__info__col">
                    <span class="example__info__block">
                        <label class="example__info__text">Type: </label>
                        <label class="example__info__text">${response.contentType?html}</label>
                    </span>
                </div>
                
				
				
				[#if response.example?has_content]
                <div class="examples-container example__response--${response.code} hidden">
                 	 <pre class="example-code_container">[#t]
	                 	 <code class="language-json hljs">[#t]${response.example?trim}[#rt]</code> 
                 	 [#t]</pre>
                </div>
                [#else]
                 -- NO EXAMPLE --
				[/#if]
				[#if response.headers?has_content]
				<h3 class="api__documentation__subtitle_section">HEADER</h3>
				<div class="example__info__col">
                    <span class="example__info__block">
                        <label class="example__info__text">Example: </label>
                    </span>
                </div>
					[#list response.headers as header]
                <div class="example__info__col">
                    <span class="example__info__block">
                        <label class="example__info__text">Type: </label>
                        <label class="example__info__text">${header.name?html}</label>
                    </span>
                </div>
                <div class="examples-container">
                 	 <pre class="example-code_container example__json example__response--${response.code} hidden">
	                 	 <code class="language-json hljs">[#t]${header.display?trim}[#rt]</code>
	                </pre>		
                </div>		
					[/#list]
				[/#if]
			</div>
	    	[/#list]
    	</div>
	    [/#if]
    </section>
</article>
[/#macro] 


[#macro printParameters title parameters] 
	<div class="api__documentation--table-parameters">
        <h2 class="api__documentation--table-parameters-title">${title} Parameters</h2>
            	
        [#list parameters as parameter]
        <div class="api__documentation__parameters">
            <div class="col--first api__documentation__parameters__row api__documentation__parameters__row-top">
                <div class="api__documentation__parameters__col">
                    <div class="api__documentation__parameters__title" data-console="${title[0]?lower_case}_${parameter.name}" >
                    	${parameter.name}
                    </div>
                </div>
                <div class="api__documentation__parameters__col">
                [#if parameter.description?has_content]
                    <div class="api__documentation__parameters__text md-item-parameter">
                    	${parameter.description}
                    </div>
                [#else]
                	<div class="api__documentation__parameters__text">
                		-- MISSING DESCRIPTION --
            		</div>
                [/#if]
                </div>
            </div>
            <div class="col--second api__documentation__parameters__row">
                <div class="api__documentation__parameters__col">
                    <span class=" api__documentation__parameters__title">
                    ${parameter.flags} (
                    	<label class="parameters__type">${parameter.dataType}</label>
                	)
                	[#if parameter.allowedValues?has_content]
                	<br>
                	one of ([#list parameter.allowedValues as value]${value}[#sep],[/#list])
                	[/#if]</span>
                </div>
                <div class="api__documentation__parameters__col">
                    <span class="api__documentation__parameters__text">                    
                	[#if parameter.example?has_content]
                        <strong>Example:</strong>${parameter.example}
                    [#elseif parameter.default?has_content]
                        <strong>Default:</strong>${parameter.default}
                    [#else]
	                	<span class="api__documentation__parameters__text">
	                    	-- MISSING EXAMPLE OR DEFAULT --
	            		</span>
                    [/#if]
                    </span>
                </div>
            </div>              
        </div>              
    	[/#list]
    </div>
[/#macro] 

[#macro printExamples action baseUri path] 
<div class="examples-container">
    <pre class="example-code_container selector-code_container wrapper_java">
    	<code class="language-java">[#t]
		[#if action.type?lower_case == 'get']
			[@macro_code_java.generateNobody action baseUri/]
		[#else]
			[@macro_code_java.generateBody action baseUri/]		
		[/#if]</code>[#t]
		[#t]</pre>

    <pre class="example-code_container selector-code_container wrapper_python hidden">
    	<code class="language-python">[#t]
        	[#if action.type?lower_case == 'get']
				[@macro_code_python.generateNobody action baseUri/]
			[#else]
				[@macro_code_python.generateBody action baseUri/]
			[/#if]
		</code>[#t]
	[#t]</pre>

    <pre class="example-code_container selector-code_container wrapper_curl hidden">
    	<code class="language-bash">[#t]
    	[#if action.type?lower_case == 'get']
			[@macro_code_curl.generateNobody action baseUri/]
		[#else]
			[@macro_code_curl.generateBody action baseUri/]
		[/#if]
		</code>[#t]
	[#t]</pre>
</div>
[/#macro] 

[#macro printConsole]
<div class="api-console_header-bar">
	<a class="api-console_header-bar_action" href="#" id="action-console-example">Back to examples</a>
</div>
<div class="api-console_section api-console_section_parameters without_border">
	<div class="api-console_section_input-group">
		<label class="api-console_section_input-group_label">Service</label>
		<h1 id="api-console__section_title" class="api-console_section_title">API TESTING CONSOLE</h1>
	</div>
	<div class="api-console_section_input-group api-console_section_input-group_select">
<!-- 		<input type="text" class="api-console_section_input-group_input" placeholder="ENVIRONMENT"> -->
		<select class="api-console_section_input-group_input" placeholder="ENVIRONMENT">
			<option value="MyApp001">Mock</option>
			<option value="MyApp002">Sandbox</option>
		</select>
	</div>
	<!-- TODO: get MyApplications -->
	<div class="api-console_section_input-group api-console_section_input-group_select">
		<select class="api-console_section_input-group_input" placeholder="Application">
			<option value="MyApp001">MyApp001</option>
			<option value="MyApp002">MyApp002</option>
		</select>
	</div>
</div>

<!-- header params -->
<div class="api-console_section api-console_section_parameters" id="api-console_section--headers"> 
	<div class="api-console_section_title">
		<h2>HEADERS</h2>
		<div class="api-console_section_title-add-btn"></div>
	</div>
	<div class="api-console_section_input-group">
		<label class="api-console_section_input-group_label">Security Scheme</label>
		<input type="text" class="api-console_section_input-group_input" placeholder="application/json">
	</div>
</div>

<!-- query params -->
<div class="api-console_section api-console_section_parameters" id="api-console_section--queryparams"> 
	<div class="api-console_section_title">
		QUERY PARAMETERS
		<div class="api-console_section_title-add-btn"></div>
	</div>
	<div class="api-console_section_input-group api-console_section_input-group_double">
		<span class="api-console_section_input-group_delete-cross">
			<button class="api-console_section_input-group_delete-cross_button">
			<span class="hidden">Remove value</span>
			</button>
		</span>
		<input type="text" class="api-console_section_input-group_input api-console_section_input-group-key" placeholder="custom key">
		<input type="text" class="api-console_section_input-group_input"placeholder="custom value">
	</div>
	<div class="api-console_section_input-group api-console_section_input-group_double">
		<span class="api-console_section_input-group_delete-cross">
			<button class="api-console_section_input-group_delete-cross_button">
			<span class="hidden">Remove value</span>
			</button>
		</span>
		<input type="text" class="api-console_section_input-group_input api-console_section_input-group-key" placeholder="custom key">
		<input type="text" class="api-console_section_input-group_input"placeholder="custom value">
	</div>
</div>


<div class="api-console_section api-console_section_parameters"> 
	<h1 class="api-console_section_title">POST PARAMETERS</h1>
	<div class="api-console_section_input-group">
		<label class="api-console_section_input-group_label">Security Scheme</label>
		<span class="api-console_section_input-group_reset-arrow">
			<button class="api-console_section_input-group_reset-arrow_button">
			<span class="hidden">Reset value</span>
			</button>
		</span>
		<input type="text" class="api-console_section_input-group_input" placeholder="application/json">
	</div>
</div>

<div class="api-console_section api-console_section_buttons">
	<div class="api-console_section_buttons_button api-console_section_buttons_button-clear">
		Clear
	</div>
	<div class="api-console_section_buttons_button api-console_section_buttons_button-reset">
		Reset
	</div>
	<div class="api-console_section_buttons_button api-console_section_buttons_button-action">
		GET
	</div>
</div>

<div class="api-console_section api-console_section_call-action">
	<h1 class="api-console_section_call-action_title">
		REQUEST
	</h1>
	<div class="api-console_section_call-action_block">
		<h2 class="api-console_section_call-action_block_title">
		REQUEST URL
		</h2>
		<p class="api-console_section_call-action_block_text">
		http://apis.bbva.com/identity/v2/me?app_id=app.bbva.ramlConsole
		</p>
	</div>
	<div class="api-console_section_call-action_block">
		<h2 class="api-console_section_call-action_block_title">
		Headers
		</h2>
		<p class="api-console_section_call-action_block_text_key">
		Authorization:
		</p>
		<p class="api-console_section_call-action_block_text">
		Tsec exJsadkjsadfdskvnkjfdsngvckfjdsnvlsfdlnvcknfdsvckncksandvcmcxsaj
		</p>
	</div>
</div>
<div class="api-console_section api-console_section_call-action">
	<h1 class="api-console_section_call-action_title">
		RESPONSE
	</h1>
	<div class="api-console_section_call-action_block">
		<h2 class="api-console_section_call-action_block_title">
		Status
		</h2>
		<p class="api-console_section_call-action_block_text">
		403
		</p>
	</div>	
	<div class="api-console_section_call-action_block">
		<h2 class="api-console_section_call-action_block_title">
		Headers
		</h2>
		<p class="api-console_section_call-action_block_text_key">
		cache-control:
		</p>
		<p class="api-console_section_call-action_block_text">
		no store
		</p>
		<p class="api-console_section_call-action_block_text_key">
		content-type:
		</p>
		<p class="api-console_section_call-action_block_text">
		application/json
		</p>
	</div>
	<div class="api-console_section_call-action_block">
		<h2 class="api-console_section_call-action_block_title">
		Body
		</h2>
		<div id="body_response-wrapper" class="api-console_section_call-action_response-wrapper">
			<div id="body_response-container" class="api-console_section_call-action_response-container">
				<pre id="pre_code_container--result" class="example-code_container-console line-numbers"></pre>
			</div>
		</div>
	</div>
</div>
[/#macro] 

[#macro compress_single_line]
    [#local captured][#nested][/#local]
	${ captured?replace("^\\s+|\\s+$|\\n|\\r", "", "rm") }
[/#macro]

[#macro erase_line_breaks]
    [#local captured][#nested][/#local]
	${ captured?replace("^\\n|^\\r|\\n$|\\r$", "", "rm") }
[/#macro]

