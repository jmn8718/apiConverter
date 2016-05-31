var a, automaticScroll, headerSize;


$(document).ready(function () {

	setUpMarkedJS();

	hljs.initHighlightingOnLoad();

	$('.md-item').each(function() {
		$this = $(this);
		$(this).html(	
				marked(	$(this).html())	).promise().done(function(){

					$this.find('table').each(function(i, item) {
						var emptyThead = true;
						var compressed = false;
						if($(item).children('thead')){
							var thead = $(item).children('thead')
							var ths = thead.children().children('th')
							for(var i = 0; i<ths.length && emptyThead;i++){
								if(ths[i].innerHTML !== "")
									emptyThead = false;		
							}
							if(emptyThead)
								thead.remove()
						}
						if($(item).children('tbody')){
							var trs = $(item).children('tbody').children('tr')
							if(emptyThead){
								$(trs[0]).children().addClass('with_border-top')
							}
						}

						$(item).addClass('api__documentation--table-elements');

					});	

					$this.find('ul').each(function(i, item) {
						/*
						 *	remove inner ul because the library add an inner ul when li are differents
						 */
						if($(item).find('li').find('ul').length > 0){
							var innerUl = $(item).find('li').find('ul');
							var ulChilds = innerUl.children()
							for(var i=0; i<ulChilds.length;i++){
								$(item).append(ulChilds[i])
							}
							innerUl.remove()									
						}
						/*end remove inner ul*/
						$(item).addClass('api__documentation__unordered-list');
					});

					$this.find('ol').each(function(i, item) {
						$(item).addClass('api__documentation__ordered-list');
					});

				});
	});

	$('.md-item-parameter').each(function() {
		$this = $(this);
		$(this).html(	
				marked(	$(this).html())	).promise().done(function(){
					$this.find('pre').each(function(i, item) {

						$(item).remove();
					});
				});
	});

//	a=$(window);

	//this variable is used to avoid check scroll when animating the navigation
	automaticScroll = false;
	headerSize = 60;

	//Set a class to the sidebar to extend the border to the end of the page when the list doesnt fill the height
	if ($('#sidebar .nav-wrapper-scroll .nav').height() < $('#sidebar .nav-wrapper-scroll').height()) {
		$('#sidebar .nav-wrapper-scroll .nav').addClass('nav-extend');
	}

	//Set resizer element centered in the page
	setResizerTop($(window).height(),$(window).scrollTop());

	//On resize window, position the resizer always centered in the page
	$(window).resize(function () {
		setResizerTop($(window).height(),$(window).scrollTop());
		setHeightOfArticles();
	});


	switchResizerClickEvent();

	/**
	 * This part causes smooth scrolling using scrollto.js
	 * We target all a tags inside the nav, and apply the scrollto.js to it.
	 */
	$(".nav__list__link").click(function (e) {

		e.preventDefault();

		if ($(this.hash) !== undefined) {
			automaticScroll = true;
			$('html,body').animate(
					{ scrollTop: $(this.hash).offset().top - headerSize },
					{
						duration: 0,
						complete: function () {
							automaticScroll = false;
						}
					});
		}

		$('.nav__list__link--active').removeClass('nav__list__link--active');
		$(e.target).addClass('nav__list__link--active');
	});

	// highlighting side nav links helper array
	var navListLinksHrefsArray = fillNavListLinksArray();

	// event scroll
	$(window).scroll(function () {
		scrollSpy( navListLinksHrefsArray,automaticScroll , headerSize);
		setResizerTop($(window).height(),$(window).scrollTop());
	});

	//language Controls
	switchEventShowLanguageControlsExamples();

	//Codes examples
	switchEventHttpStatusCodes();

	$('#action-overview').click(function(evn){
		evn.preventDefault();
	})

	switchEventToggleConsole();

	//Codes selected must be loaded when the page is ready
	setTimeout(function () {
		if(window.location.hash.length>0){
			$('html,body').animate(
					{
						scrollTop: $(window.location.hash).offset().top -(headerSize+20)
					},
					{
						duration: 0
					});
		}

		setHeightOfArticles();
		$('.example__status-codes-wrapper').each(function () {
			$(this).find('.example__status-code')[0].click();
		});
	}, 150);

});

/**
 * Handler the highlighting functionality on scroll.
 */
function fillNavListLinksArray(){
	var navListItemChildren = $(".nav__list__item").children(); // find the a children of the list items
	var navListLinksHrefsArray = []; // create the empty aArray
	for (var i = 0; i < navListItemChildren.length; i++) {
		if ( $(navListItemChildren[i]).hasClass('nav__list__link') ) {
			navListLinksHrefsArray.push($(navListItemChildren[i]).attr('href'));
		}
	}
	return navListLinksHrefsArray;
}

function switchResizerClickEvent(){
	$('.resizer').click(function () {
		if ($('#api-doc.api-doc--example-expanded').length === 0) {

			$('.resizer').addClass('resizer--displayed-content');
			$('.resizer__arrow').addClass('resizer__arrow--displayed-content');
			$('#api-doc').addClass('api-doc--example-expanded');
			setHeightOfArticles();
			$('.api__documentation').css('display', 'none');
		}

		else {
			$('.resizer').removeClass('resizer--displayed-content');
			$('.resizer__arrow').removeClass('resizer__arrow--displayed-content');
			$('#api-doc').removeClass('api-doc--example-expanded');

			$('.api__documentation').css('display', 'table-cell');
		}		
	});
}

function switchEventShowLanguageControlsExamples(){
	$('.language-controls__item[data-item]').click(function () {
		$('.language-controls__item[data-item]').removeClass('item-selected');
		$(this).addClass('item-selected');
		$('.language-controls--selected--text').text($(this).text());
		var lang = $(this).attr('data-item');
		$('.selector-code_container').addClass('hidden');
		$('.selector-code_container.wrapper_' + lang).removeClass('hidden');
		$('html,body').animate(
				{scrollTop: $($('.nav__list__link--active').attr('href')).offset().top - headerSize}
				, 0);
	});

	$('.language-controls--selected').click(function () {
		$(this).toggleClass('language-controls--displayed');
	});
}

/**
 * Switch Http Status codes examples
 */
function switchEventHttpStatusCodes(){
	$('.example__status-code').click(function (event) {
		var code, codeContentClassName, codeContainer, codeResponseBlock, classesButton, startIndex, endIndex, codeButtonId, targetCodeClass;
		//Hide the responses containers
		$(event.target).closest('.example__status-codes').find('.example__info').addClass('hidden');
		$(event.target).closest('.example__status-codes').find('.example__info .example__json').addClass('hidden');
		$(event.target).closest('.example__status-codes-wrapper').find('.example__status-code').removeClass('example__status-code--selected');
		$(event.target).addClass('example__status-code--selected');

		//Show the response code information
		code = $(event.target).text();
		classesButton = $(event.target).attr('class');
		targetCodeClass = 'example__status-code__' + code + '-';
		startIndex = classesButton.indexOf(targetCodeClass) + targetCodeClass.length;
		endIndex = classesButton.indexOf(' ', startIndex)
		codeButtonId = classesButton.substring(startIndex, endIndex)
		codeContentClassName = '.example__status-code__' + code + '-' + codeButtonId;
		codeContainer = $(event.target).closest('.example__status-codes').find(codeContentClassName);
		codeContainer.removeClass('hidden');
		codeResponseBlock = '.example__response--'+code
		codeContainer.find(codeResponseBlock).removeClass('hidden');
	});
}

/* Console *******/
function switchEventToggleConsole(){

	var formIdConsoleData,
	paramsConsoleArray;

	$('.action-console').click(function(evn){
		evn.preventDefault();

		paramsConsoleArray = new Array()

		formIdConsoleData = $(this).data('console-id');
		divParamsConsoleDataArray = $( '#' + formIdConsoleData ).find('[data-console]');

		paramsConsoleArray.push($( '#' + formIdConsoleData ).find('.api__documentation__title label').html());
		divParamsConsoleDataArray.each(function(){
			paramsConsoleArray.push($(this).data('console'));
		});
		
		// add title
		
		
		toggleConsole( paramsConsoleArray );
	})

	$('#action-console-example').click(function(evn){
		evn.preventDefault();
		toggleConsole( [] );
	});

}

function toggleConsole( parametersArray ){

	if( parametersArray.length > 0 ) buildConsoleByParameters( parametersArray );

	$('#action-console').toggleClass('hidden');
	$("#language-selector > *").toggleClass('hidden');
	$(".api__example-console").toggleClass('hidden');

	// TEST ******************************** TODO: get response and print function
	blockResponseBody='{\n  \"result\": {\n    \"code\": 206,\n    \"info\": \"Partial Content\"\n  },\n  \"paging\": {\n    \"page_size\": 3,\n    \"links\": {\n      \"first\": {\n        \"href\": \"https://{hostname}/{dimension}/{value}/payments_cube?date_min=201401&date_max=201412&group_by=month&by=cards&$page_size=3\"\n      },\n      \"self\": {\n        \"href\": \"https://{hostname}/{dimension}/{value}/payments_cube?date_min=201401&date_max=201412&group_by=month&by=cards&$page_size=3\"\n      },\n      \"next\": {\n        \"href\": \"https://{hostname}/{dimension}/{value}/payments_cube?date_min=201401&date_max=201412&group_by=month&by=cards&$page_size=3&$page_key=201404\"\n      }\n    }\n  },\n  \"metadata\": {\n    \"hash_description\": {\n      \"ranges\": [\n        {\n          \"order\": \"1\",\n          \"name\": \"gender\",\n          \"values\": [\n            {\n              \"label\": \"M\",\n              \"description\": \"Male\"\n            },\n            {\n              \"label\": \"F\",\n              \"description\": \"Female\"\n            },\n            {\n              \"label\": \"E\",\n              \"description\": \"Enterprise\"\n            },\n            {\n              \"label\": \"U\",\n              \"description\": \"Unknown\"\n            }\n          ]\n        },\n        {\n          \"order\": \"2\",\n          \"name\": \"age\",\n          \"values\": [\n            {\n              \"label\": \"0\",\n              \"description\": \"<=24\"\n            },\n            {\n              \"label\": \"1\",\n              \"description\": \"25-34\"\n            },\n            {\n              \"label\": \"2\",\n              \"description\": \"35-44\"\n            },\n            {\n              \"label\": \"3\",\n              \"description\": \"45-54\"\n            },\n            {\n              \"label\": \"4\",\n              \"description\": \"55-64\"\n            },\n            {\n              \"label\": \"5\",\n              \"description\": \">=65\"\n            },\n            {\n              \"label\": \"U\",\n              \"description\": \"Unknown\"\n            }\n          ]\n        },\n        {\n          \"order\": \"3\",\n          \"name\": \"amount\",\n          \"values\": [\n            {\n              \"label\": \"0\",\n              \"description\": \"<=9.99\"\n            },\n            {\n              \"label\": \"1\",\n              \"description\": \"10-19.99\"\n            },\n            {\n              \"label\": \"2\",\n              \"description\": \"20-29.99\"\n            },\n            {\n              \"label\": \"3\",\n              \"description\": \"30-39.99\"\n            },\n            {\n              \"label\": \"4\",\n              \"description\": \"40-49.99\"\n            },\n            {\n              \"label\": \"5\",\n              \"description\": \"50-59.99\"\n            },\n            {\n              \"label\": \"6\",\n              \"description\": \"60-79.99\"\n            },\n            {\n              \"label\": \"7\",\n              \"description\": \"80-99.99\"\n            },\n            {\n              \"label\": \"8\",\n              \"description\": \"100-119.99\"\n            },\n            {\n              \"label\": \"9\",\n              \"description\": \"120-149.99\"\n            },\n            {\n              \"label\": \"10\",\n              \"description\": \"150-199.99\"\n            },\n            {\n              \"label\": \"11\",\n              \"description\": \"200-299.99\"\n            },\n            {\n              \"label\": \"12\",\n              \"description\": \"300-499.99\"\n            },\n            {\n              \"label\": \"13\",\n              \"description\": \"500-999.99\"\n            },\n            {\n              \"label\": \"14\",\n              \"description\": \">=1000\"\n            }\n          ]\n        }\n      ]\n    }\n  },\n  \"data\": {\n    \"stats\": [\n      {\n        \"date\": \"201401\"\n      },\n      {\n        \"date\": \"201402\",\n        \"merchants\": 19,\n        \"cards\": 139,\n        \"txs\": 161,\n        \"cube\": [\n          {\n            \"hash\": \"F#0#0\",\n            \"txs\": 1,\n            \"avg\": 7.4\n          },\n          {\n            \"hash\": \"F#0#3\",\n            \"txs\": 1,\n            \"avg\": 33.2\n          },\n          {\n            \"hash\": \"F#0#7\",\n            \"txs\": 1,\n            \"avg\": 85.8\n          },\n          {\n            \"hash\": \"F#1#0\",\n            \"txs\": 2,\n            \"avg\": 9.9\n          },\n          {\n            \"hash\": \"F#1#1\",\n            \"txs\": 8,\n            \"avg\": 16.48\n          },\n          {\n            \"hash\": \"F#1#12\",\n            \"txs\": 1,\n            \"avg\": 467.6\n          },\n          {\n            \"hash\": \"F#1#2\",\n            \"txs\": 1,\n            \"avg\": 23.4\n          },\n          {\n            \"hash\": \"F#1#3\",\n            \"txs\": 1,\n            \"avg\": 36.8\n          },\n          {\n            \"hash\": \"F#1#6\",\n            \"txs\": 3,\n            \"avg\": 75.24\n          },\n          {\n            \"hash\": \"F#2#0\",\n            \"txs\": 3,\n            \"avg\": 6.4\n          },\n          {\n            \"hash\": \"F#2#1\",\n            \"txs\": 11,\n            \"avg\": 11.84\n          },\n          {\n            \"hash\": \"F#2#12\",\n            \"txs\": 1,\n            \"avg\": 396\n          },\n          {\n            \"hash\": \"F#2#2\",\n            \"txs\": 4,\n            \"avg\": 21.32\n          },\n          {\n            \"hash\": \"F#2#3\",\n            \"txs\": 2,\n            \"avg\": 38.56\n          },\n          {\n            \"hash\": \"F#2#4\",\n            \"txs\": 3,\n            \"avg\": 48.28\n          },\n          {\n            \"hash\": \"F#2#5\",\n            \"txs\": 1,\n            \"avg\": 53.32\n          },\n          {\n            \"hash\": \"F#2#7\",\n            \"txs\": 3,\n            \"avg\": 87.68\n          },\n          {\n            \"hash\": \"F#2#9\",\n            \"txs\": 1,\n            \"avg\": 141.68\n          },\n          {\n            \"hash\": \"F#3#0\",\n            \"txs\": 4,\n            \"avg\": 8.88\n          },\n          {\n            \"hash\": \"F#3#1\",\n            \"txs\": 9,\n            \"avg\": 16.44\n          },\n          {\n            \"hash\": \"F#3#2\",\n            \"txs\": 2,\n            \"avg\": 27.36\n          },\n          {\n            \"hash\": \"F#3#3\",\n            \"txs\": 4,\n            \"avg\": 33.76\n          },\n          {\n            \"hash\": \"F#3#4\",\n            \"txs\": 2,\n            \"avg\": 44.4\n          },\n          {\n            \"hash\": \"F#3#5\",\n            \"txs\": 1,\n            \"avg\": 55.68\n          },\n          {\n            \"hash\": \"F#3#6\",\n            \"txs\": 5,\n            \"avg\": 63.88\n          },\n          {\n            \"hash\": \"F#4#0\",\n            \"txs\": 2,\n            \"avg\": 4.44\n          },\n          {\n            \"hash\": \"F#4#1\",\n            \"txs\": 2,\n            \"avg\": 14.92\n          },\n          {\n            \"hash\": \"F#4#2\",\n            \"txs\": 2,\n            \"avg\": 24\n          },\n          {\n            \"hash\": \"F#4#3\",\n            \"txs\": 2,\n            \"avg\": 32.32\n          },\n          {\n            \"hash\": \"F#5#1\",\n            \"txs\": 3,\n            \"avg\": 1.6\n          },\n          {\n            \"hash\": \"F#5#2\",\n            \"txs\": 1,\n            \"avg\": 22.64\n          },\n          {\n            \"hash\": \"F#5#3\",\n            \"txs\": 2,\n            \"avg\": 31.52\n          },\n          {\n            \"hash\": \"F#5#4\",\n            \"txs\": 1,\n            \"avg\": 43\n          },\n          {\n            \"hash\": \"F#5#6\",\n            \"txs\": 1,\n            \"avg\": 63\n          },\n          {\n            \"hash\": \"M#0#0\",\n            \"txs\": 2,\n            \"avg\": 7.32\n          },\n          {\n            \"hash\": \"M#0#1\",\n            \"txs\": 2,\n            \"avg\": 15.4\n          },\n          {\n            \"hash\": \"M#0#3\",\n            \"txs\": 1,\n            \"avg\": 38\n          },\n          {\n            \"hash\": \"M#1#0\",\n            \"txs\": 2,\n            \"avg\": 1.4\n          },\n          {\n            \"hash\": \"M#1#1\",\n            \"txs\": 5,\n            \"avg\": 13.84\n          },\n          {\n            \"hash\": \"M#1#10\",\n            \"txs\": 1,\n            \"avg\": 179.2\n          },\n          {\n            \"hash\": \"M#1#2\",\n            \"txs\": 1,\n            \"avg\": 27.6\n          },\n          {\n            \"hash\": \"M#1#3\",\n            \"txs\": 1,\n            \"avg\": 32\n          },\n          {\n            \"hash\": \"M#1#6\",\n            \"txs\": 2,\n            \"avg\": 62.44\n          },\n          {\n            \"hash\": \"M#1#7\",\n            \"txs\": 1,\n            \"avg\": 86.64\n          },\n          {\n            \"hash\": \"M#1#9\",\n            \"txs\": 1,\n            \"avg\": 136\n          },\n          {\n            \"hash\": \"M#2#0\",\n            \"txs\": 2,\n            \"avg\": 6.48\n          },\n          {\n            \"hash\": \"M#2#1\",\n            \"txs\": 4,\n            \"avg\": 13.16\n          },\n          {\n            \"hash\": \"M#2#10\",\n            \"txs\": 1,\n            \"avg\": 189.52\n          },\n          {\n            \"hash\": \"M#2#2\",\n            \"txs\": 4,\n            \"avg\": 23.64\n          },\n          {\n            \"hash\": \"M#2#3\",\n            \"txs\": 4,\n            \"avg\": 33.2\n          },\n          {\n            \"hash\": \"M#2#4\",\n            \"txs\": 4,\n            \"avg\": 47\n          },\n          {\n            \"hash\": \"M#2#5\",\n            \"txs\": 2,\n            \"avg\": 56.12\n          },\n          {\n            \"hash\": \"M#2#6\",\n            \"txs\": 1,\n            \"avg\": 63\n          },\n          {\n            \"hash\": \"M#2#7\",\n            \"txs\": 2,\n            \"avg\": 82\n          },\n          {\n            \"hash\": \"M#2#8\",\n            \"txs\": 2,\n            \"avg\": 103.32\n          },\n          {\n            \"hash\": \"M#2#9\",\n            \"txs\": 1,\n            \"avg\": 132.8\n          },\n          {\n            \"hash\": \"M#3#1\",\n            \"txs\": 1,\n            \"avg\": 15.6\n          },\n          {\n            \"hash\": \"M#3#2\",\n            \"txs\": 3,\n            \"avg\": 25.2\n          },\n          {\n            \"hash\": \"M#3#3\",\n            \"txs\": 1,\n            \"avg\": 33.2\n          },\n          {\n            \"hash\": \"M#3#5\",\n            \"txs\": 1,\n            \"avg\": 58\n          },\n          {\n            \"hash\": \"M#3#6\",\n            \"txs\": 1,\n            \"avg\": 64.88\n          },\n          {\n            \"hash\": \"M#3#7\",\n            \"txs\": 2,\n            \"avg\": 88.8\n          },\n          {\n            \"hash\": \"M#3#8\",\n            \"txs\": 1,\n            \"avg\": 109.2\n          },\n          {\n            \"hash\": \"M#4#1\",\n            \"txs\": 1,\n            \"avg\": 19.36\n          },\n          {\n            \"hash\": \"M#4#2\",\n            \"txs\": 2,\n            \"avg\": 24.32\n          },\n          {\n            \"hash\": \"M#4#3\",\n            \"txs\": 3,\n            \"avg\": 34.6\n          },\n          {\n            \"hash\": \"M#4#6\",\n            \"txs\": 1,\n            \"avg\": 64.6\n          },\n          {\n            \"hash\": \"M#5#0\",\n            \"txs\": 1,\n            \"avg\": 8.4\n          },\n          {\n            \"hash\": \"M#5#1\",\n            \"txs\": 2,\n            \"avg\": 13.6\n          },\n          {\n            \"hash\": \"M#5#10\",\n            \"txs\": 1,\n            \"avg\": 181.72\n          },\n          {\n            \"hash\": \"M#5#2\",\n            \"txs\": 2,\n            \"avg\": 25.48\n          },\n          {\n            \"hash\": \"M#5#6\",\n            \"txs\": 1,\n            \"avg\": 65.4\n          }\n        ]\n      },\n      {\n        \"date\": \"201403\"\n      }\n    ]\n  }\n}'

	var preCodeContainer = $('#pre_code_container--result');
	preCodeContainer.empty();
	
	var codeResponse = $('<code/>',{ 'id':'api-console-body_response-code','class':'hljs language-json'}).html(blockResponseBody);
	preCodeContainer.append(codeResponse);

	$('#api-console-body_response-code').each(function(i, block) {
		hljs.highlightBlock(block);
		hljs.lineNumbersBlock(block);
	});

	// END TEST ********************************

}

function buildConsoleByParameters( paramsConsoleArray ){
	
	// build title
	$('#api-console__section_title').html(paramsConsoleArray[0]);
	
	console.log( paramsConsoleArray );
}

/* Console *******/


function setHeightOfArticles(){
	$('.api__documentation').each(function(idx, item){
		$(this).parent('article').css('height',$(item).height());
	});
}

function setResizerTop(windowHeight, windowScrollTop){
	$('.resizer').css('top', windowHeight / 2 + windowScrollTop);
}

/**
 * ScrollSpy event Handler
 * @param aArray
 * @param automaticScroll
 * @param headerSize
 */
function scrollSpy(aArray,automaticScroll,headerSize){

	if (!automaticScroll) {
		var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
		var windowHeight = $(window).height(); // get the height of the window
		var docHeight = $(document).height();
		if (windowPos + windowHeight == docHeight) {
			if (!$("nav li:last-child a").hasClass("nav__list__link--active")) {
				var navActiveCurrent = $(".nav__list__link--active").attr("href");
				$("a[href='" + navActiveCurrent + "']").removeClass("nav__list__link--active");
				$("nav li:last-child a").addClass("nav__list__link--active");
			}
		} else {		
			for (var i = 0; i < aArray.length; i++) {
				var theID = aArray[i];
				if ($(theID).length !== 0) {
					var divPos = $(theID).offset().top; // get the offset of the div from the top of page
					var divHeight = $(theID).height(); // get the height of the div in question

					if ((windowPos + headerSize) >= divPos && (windowPos + headerSize) < (divPos + divHeight)) {
						$('.nav__list__link--active').removeClass("nav__list__link--active");
						$("a[href='" + theID + "']").addClass("nav__list__link--active");
						break;
					}
				}
			}
		}
	}
}

function setUpMarkedJS(){

	var rendererInit = new marked.Renderer();

	marked.setOptions({
		renderer : rendererInit,
		gfm : true,
		tables : true,
		breaks : false,
		pedantic : false,
		sanitize : true,
		smartLists : true,
		smartypants : true
		,langPrefix : 'language-'
	});

	rendererInit.link = function ( href, title, text) {
		return '<a href="' + href + '" title="' + title + '" class="api__documentation-link" >' + text + '</a>';
	};

	rendererInit.code = function ( code , language ){
		var lang = language === undefined || typeof language == 'undefined' ? 'json' : language ;
		return '<pre class="example-code_container"><code class="'+ "language-" + lang+ ' hljs">'+ code + '\n</code></pre>\n';
	}

	rendererInit.heading = function ( text , level ){
		return '<h2>' + text + '</h2>';
	}

//	paragraph(string text)
	rendererInit.paragraph = function ( text ){
		return '<p class="api__documentation__text">' + text + '</p>';
	}

}

