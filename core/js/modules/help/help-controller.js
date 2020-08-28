define([
	'underscore',
	'jquery',
	'../BaseModule',
	'json!settings-general',
	'utils',
	'logger'
], function(_, $, BaseModule, GeneralSettings, Utils, Logger) {
	'use strict';

	return BaseModule.extend({
		el: ".top-menu .help",
	
		templateUrl: "content/tools/help_" + Utils.lang,

		initialize: function(options) {
			Logger.log("INIT: Help Controller");
			this.render();
		},

		serializeData: function() {
			return {
				settings: GeneralSettings
			};
		},

		render: function() {
			this.template = this.template(this.serializeData());
			
			this.setMagnificPopupTemplate();
		},

		setMagnificPopupTemplate: function() {
			this.$el.magnificPopup({
			    items: { src: this.template },
			    type: 'inline'
			});
		}
	});
});