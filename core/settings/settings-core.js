'use strict';

define({
	debugMode: false,

	contentContainer: "#dynamic_content",
	
	cssFileName: "theme.css",		//name of the css theme file to load.

	connectionMode: "scorm", 	//currently only supports "scorm"

	skipSplash: false,

	/*------------------ Toolbar -----------------*/
	showPrint: 		false, 		//PLEASE don't turn this on!!
	showSecondHome: false,

	/*------------------ Navigation -----------------*/
	topNavFullwidth:     true,
	breadCrumbs: 	     true,
	loopLevel: 		     3,		// 0 is a course loop, 1 takes you back to home after each module, 3 is none (2 makes no sense so far)
	lvlPageOf:  	     0,		//Level at which the pageOf acts (lvlTimeline)
	pageOfPermissive:    true, 	//determines if the pageOf will take into account subPages (tlPermissive)
	navigationMode:      1,

	/*------------------ TIMELINE Object -----------------*/
	activateTimeline: false,
	tlContent: 		  true, 	//is the timeline within the content (not in the frame).
	tlPlace: 		  "",		//this is the spot where we need to append and add the timeline div. default is below the first h1

	
	/*------------------ External Links-----------------*/
	extMethod: "",		//default is target=_blank, other valudes : "lightbox" "popup". overridé local avec data-extmethod="value"

	/*------------------ Favorites -----------------*/
	autoAddFavoriteBtn: true,		//adds the favorite button on every page

	/*------------------ Loading Box ---------------*/
	loadingBoxTransitionSpeed: 1000,

	/*------------------ Locking System ---------------*/
	enableLockingSystem: true,
	//This will keep any lockedin pages locked-in even
	//after quitting the course or after completing the course
	//and returning to that page. Persistent.
	persistentLockedIn: true,

	/*------------------ Micro learning ---------------*/
	//this enables the Micro learning feature. 
	//It includes:
	//- the micro-menu navigation
	//- the fixed page (navigate sections as you scroll)
	//- navigation through modules instead of pages
	microLearning: {
		//micro-menu position; valid values: "left", "right"
		navPosition: "left",
		//table of content marker position;
		//this will align the marker next to the list but on the specified position
		//valid values: "left", "right"
		tocMarkerPosition: "right",
		//speed at which the sections transition (in miliseconds)
		//*Be sure to change the $SECTION_ANIM_SPEED in micro-section.scss
		//if you change this setting, so that both are identical.*
		scrollingSpeed: 1000,
		//speed at which the elements inside the sections animate. 
		//valid values: "slow", "normal", "fast"
		animationSpeed: "fast",
		// Factor of screen size (%) that the section must cross
   		// before it's considered visible/invisible
		TOP_MARGIN: 0.1,
		BOTTOM_MARGIN: 0.1,
		//Enables/disables the window resize warning & refresh dialog
		windowResizeDialog: true
	}
});