define([
	'underscore',
	'jquery',
	'logger',
	'labels',
	'settings-core',
	'utils',
	'../BaseModule'
], function(_, $, Logger, labels, CoreSettings, Utils, BaseModule) {
	'use strict';

	return BaseModule.extend({
		ui: {	
			glossaryBtn: ".top-menu .glossary"
		},
		
		templateUrl: "content/tools/glossary_" + Utils.lang,
		
		initialize: function(options) {
			Logger.log("INIT: Glossary");
		},

		setListeners: function() {},

		serializeData: function() {
			return {};
		},

		render: function() {
			if (!this.isRendered) {
				this.template = this.template(this.serializeData());
				
				this.setMagnificPopupTemplate();
				this.setListeners();
				this.isRendered = true;
			}
		},

		onPageLoaded: function() {
			this.render();
			this.scan();
		},

		setMagnificPopupTemplate: function() {
			this.ui.glossaryBtn.magnificPopup({
			    items: { src: this.template },
			    type: 'inline',
			    callbacks: {
    				open: function() {
    					$('ul#glossaryIndex').listnav({
							includeAll:  false,
							includeNums: false,
							noMatchText: labels.glossary.emptyTerm,
							showCounts:  false
						});
    				}
    			}
			});
		},

		scan: function() {
			var that = this;
			$(CoreSettings.contentContainer).find(".csps-glossary").each(function() {
				that.generateTermPopup(this);
			});
		},

		/**
		 * generates a popup for the specified term in the page
		 * @param  {DOM element} term; the link to generate the popup
		 */
		generateTermPopup: function(term) {
			var target = $(term).closest("div");
			var targetID = $(term).attr("href");
			var found = $(this.template).find(targetID);
			if (found.length === 0) {
				var thisSub = masterStructure.currentSub;
				var bugFlag = false;
				for (var loop = 0; loop < thisSub.aBugs.length; loop++) {
					if (thisSub.aBugs[loop].type == 5) {
						bugFlag = true;
					}
				}
				if (bugFlag === false) {
					masterStructure.diagnosis.addGlossary(targetID + " is not a valid glossary ID", thisSub);
				}

			}
			var newID = "pop_" + targetID.replace("#", "");
			var modalbody = found.children("dd").html();

			var htmlRender = "<section id='" + newID + "' class='mfp-hide unethical modal-dialog modal-content overlay-def'>";
			htmlRender += "<header class='modal-header'><h2 class='modal-title'>" + labels.vocab.definition + "" + $(found).children("dt").text() + "</h2></header>";
			htmlRender += "<div class='modal-body'>";
			htmlRender += "</div></section>";
			$(target).append(htmlRender);
			$("#" + newID).children(".modal-body").html(modalbody);
			$(term).addClass("wb-lbx").attr("href", "#" + newID);
			masterStructure.initWbs();
		}
	});
});