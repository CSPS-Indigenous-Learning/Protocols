'use strict';

//Load the configs, then load the app.
require(['require-configs'], function() {
	require([
		'jquery',
		'logger',
		'utils',
		"app",
		"settings-core",
		"json!settings-general"
	], function($, Logger, Utils, App, CoreSettings, GeneralSettings) {
		$.ajaxSetup({ cache: false });

		require(['wet-boew'], function() {
			var courseTitle = Utils.lang === "en" ? GeneralSettings.courseTitle_en : GeneralSettings.courseTitle_fr;
			var courseSubtitle = Utils.lang === "en" ? GeneralSettings.courseSubtitle_en : GeneralSettings.courseSubtitle_fr;
			var seriesTitle = Utils.lang === "en" ? GeneralSettings.seriesTitle_en : GeneralSettings.seriesTitle_fr;

		    $(function(e) {
		    	//custom theme css
		    	document.getElementById('theme-style').href = "./theme/" + CoreSettings.cssFileName;

		    	//setup titles
				//document.title = GeneralSettings.courseLegacyCode + " - " + courseTitle;
				$("#wb-sttl>a>span").html(courseTitle);
				if (courseSubtitle.length > 0) {
					$("#wb-sttl>a").append("<span class='subtitle'>"+courseSubtitle+"</span>");
				}
				if (seriesTitle.length > 0) {
					$("#wb-bar").children("div.container").prepend("<h1 class='series-title'><a href='#'>"+seriesTitle+"</a></h2>");
				}

				//// START THE FRAMEWORK
				//catch when the supermenu is injected in the navigation by the wet-boew
				$(document).on("wb-ready.wb", function(event) {
					Logger.log('App Initialize');
					
					App.initialize();
				});
			});
		});
	});
});