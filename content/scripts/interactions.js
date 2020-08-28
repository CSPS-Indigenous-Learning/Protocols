//DO NOT MODIFY ↓
define([
    'jquery'
], function($) {
//DO NOT MODIFY ↑

	function initialize() {
		setEvents();
	}

	function setEvents() {
		$(masterStructure)
			.on("Framework:systemReady", function() {
				systemReady();
			})
			.on("Framework:pageLoaded", function() {
				pageLoaded();
			});
	}

	/* is called only once, when the Course has loaded*/
	function systemReady() {
		//console.log("Interactions:systemReady");
		// replaceQuit(); // change the quit button
	}

	/* is called on every page load, great for adding custom code to all pages*/
	function pageLoaded() {
		//console.log("Interactions:pageLoaded");
		
		$('body').removeClass('m0 m1 m2 m3').addClass("m"+window.masterStructure.currentNav[0]);
		
		$(".wrap").each(function(){
			//console.log($(this).height());
			//console.log($(".micro-section").innerHeight());
			if($(this).height() > $(".micro-section").innerHeight() && !$('body').hasClass('m0')){
				//console.log("test");
				$(this).addClass("too-high");
				$(this).css({height: $(".micro-section").innerHeight() - 50});
			}
		});
		
		$(window).one("resize", function(){
			$(".wrap").each(function(){
				//console.log($(this).height());
				//console.log($(".micro-section").innerHeight());
				if($(this).height() > $(".micro-section").innerHeight() && !$('body').hasClass('m0')){
					//console.log("test");
					$(this).addClass("too-high");
					$(this).css({height: $(".micro-section").innerHeight() - 50});
				}
			});
		});
	}

	
	//replaces the quit button with the call to the quit page without removing the interception
	function replaceQuit() {
		//copy the quit button
		var $quitContainer=$(".quit").parent();
		$(".quit").remove();
		var quitText=(lang=="en")?"Exit":"Quitter";
		//prepare ajax lightbox code
		var trigger="$(document).trigger('open.wb-lbx',[{src: 'content/tools/quit_"+lang+".html', type: 'ajax'}]);"
		//add the new button; it cannot be named 'quit'
		$quitContainer.append("<a href=\"#\" id='newquit' class=\"new-quit\" onclick=\""+trigger+"\">"+quitText+"</a>");
		//style it as a quit
		// $(".new-quit").css("background-position","-150px 4px");//    background-position: -150px 4px;
	}
	initialize();

});