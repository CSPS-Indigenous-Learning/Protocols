define([
	'jquery',
	'modules/BaseModule',
	'logger',
	'./tool-item'
], function($, BaseModule, Logger, ToolItem) {
	'use strict';

	return BaseModule.extend({
		events: {
			"keydown a.toolbox": "onToolboxKeyDown",
			"keydown .tb-container a": "onToolboxItemKeyDown"
		},

		initialize: function(options) {
			Logger.log("INIT: Toolbox");

			this.options = options;
			
			this.$toolboxLink = $('a.toolbox');
			//TODO: make mobile check dynamic instead of dupplicating code for both desktop and mobile
			this.$toolboxLinkMobile = $("#mb-pnl").find("a.toolbox");
			this.isOpen = false;
			this.items = [];
			this.current;
			this.target;

			//fix the mobile version (put first for next mobile affectations)
			$("section.lng-ofr").find(".tb-item").parent('li').remove();
			$("section.lng-ofr").find(".tb-item").remove(); // fix ie8 version sc
			$("section.lng-ofr").find("ul.tb-container").detach();

			$("section.lng-ofr").after("<ul id='mb-tb' class='list-unstyled open tb-container' role='menu' aria-hidden='true'></ul>");
			$("#mb-tb").append($("ul.tb-container").html());
			$("#mb-tb").hide();
			this.$toolboxLink.append("<span class='wb-inv'>"+labels.nav.toolboxInstr+"</span>")

			this.initializeItems();

			this.setListeners();
		},

		initializeItems: function() {
			//initialize items
			var kids = this.$toolboxLink.next("ul").children("li");
			var mbKids = this.$toolboxLinkMobile.closest('section').next("ul#mb-tb").children("li"); // fix mobile toolbox problem sc
			for (var i = 0; i < kids.length; i++) {
				this.items[i] = new ToolItem({
					el: kids.eq(i)[0],
					index: i,
					setsize: kids.length,
					mbObj: mbKids.eq(i)
				});
			}
		},

		setListeners: function() {
			var that = this;
			//add aria-expanded and aria-hidden
			//add attribute open		
			//add role="menuitem"	

			$(document).on("click", _.bind(this.onToolboxClick, this));
			this.$toolboxLink.on("click", function(e) {
				//do not interfere with other components that are listening on the click event for links
				e.preventDefault();
			});
		},

		onToolboxItemKeyDown: function(e) {
			//do not interfere with other components that are listening on the key down event
			e.stopPropagation();

			var tabKey = 9;
			var upKey = 38;
			var downKey = 40;
			var escapeKey = 27;

			if (e.which == downKey || e.which == upKey) {
				e.preventDefault();
				var offset = (e.which === downKey) ? 1 : -1;
				this.scrollItems(offset);
			} else if (e.which === tabKey || e.which === escapeKey) {
				this.menuClose();
				//TODO: should focus on the element based on the device
				//FIXME: Broken mobile.
				this.$toolboxLink.focus();
			}
		},
		onToolboxKeyDown: function(e) {
			//do not interfere with other components that are listening on the key down event
			e.stopPropagation();

			var container = $('ul.tb-container');
			var tabKey = 9;
			var upKey = 38;
			var downKey = 40;

			if (container.is(":visible") && !this.$toolboxLink.is(":focus")) {
				if (e.which === tabKey) {
					this.menuClose();
				} else if (e.which === downKey || e.which === upKey) {
					e.preventDefault();
					var offset = (e.which === downKey) ? 1 : -1;
					this.scrollItems(offset);
				}
			}
			// if inside toolbox menu
			if (this.$toolboxLink.is(":focus") && e.which === downKey) {
				//get inside downarrow
				e.preventDefault();
				// added for ie8 to work sc
				if (!this.isOpen) {
					this.menuToggle();
				}

				this.target = 0;
				$(container).find('a').first().focus(); // fix for mobile sc
				this.current = 0;
				this.setFocus();
			}
		},

		onToolboxClick: function(e) {
			var container = this.$toolboxLink.next("ul");
			if (!container.is(e.target) // if the target of the click isn't the container...
				&& container.has(e.target).length === 0 // ... nor a descendant of the container
				&& this.isOpen != false // ... and the toolbox is open
				&& !this.$toolboxLink.is(e.target) && !this.$toolboxLink.children().is(e.target) // ... anything inside the toolbox link really...(SVG, SPAN etc...)
			) {
				this.menuClose(); //clickoutside
				this.isOpen = false;
			}
			if (this.$toolboxLink.is(e.target) || this.$toolboxLink.children().is(e.target)) {
				this.menuToggle();
			}
		},

		menuClose: function() {
			this.isOpen = false;
			$("#mb-tb").slideToggle();
			this.$toolboxLink.next("ul").slideToggle();
		},
		menuDisplay: function() {
			this.$toolboxLink.next("ul").slideToggle();
			$("#mb-tb").slideToggle();
			this.isOpen = true;
		},
		menuToggle: function() {
			if (this.isOpen) {
				this.menuClose();
			} else {
				this.menuDisplay();
			}
		},
		setFocus: function() {
			this.current = this.target;
			this.items[this.target].setFocus();
		},
		scrollItems: function(offset) {
			if (this.current == 0 && offset < 0) {
				this.target = this.items.length - 1;
			} else if (this.current == (this.items.length - 1) && offset > 0) {
				this.target = 0;
			} else {
				this.target = this.current + offset;
			}
			this.setFocus();
		}
	});
});