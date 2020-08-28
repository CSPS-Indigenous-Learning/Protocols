/*define([
	'jquery',
	'modules/BaseModule',
	'utils'
], function($, BaseModule, Utils) {
	return BaseModule.extend({
		events: {
			'mouseover .module-info': 'syncPathNav'
		},
		initialize: function() {
			this.$arrowsBottom = $('.arrows-bottom');
			$('#mod_xxx').remove();
			this.$sections = $('.module-info');

			this.setListeners();
		},

		setListeners: function() {
			var that = this;
			if (!this.isMobile()) {
				$(masterStructure).on('Framework:pageLoaded#m0', function(e) {
					that.syncPathNav();
				});
			}
		},

		isMobile: function() {
			return Utils.system.isMobile;
		},

		syncPathNav: function(e) {
			var $target = e ? $(e.target) : this.$sections.first();
			if ($target[0].tagName !== "SECTION") {
				//since we could hover on a child element
				//make sure we are referencing the section
				$target = $target.closest('section');
			}
         var offsetLeft = $target[0].offsetLeft;
         var modNameWidth = $target.find('.mod-name').outerWidth();
         var ribbonModuleWidth = $target.find('.ribbon-module').outerWidth();

         //we want the arrows on the right of the section
         //centered with the ribbon module
         var left = (offsetLeft + modNameWidth) + (ribbonModuleWidth / 2);
         
         this.$arrowsBottom.css('left', left);
      }
	});
});*/