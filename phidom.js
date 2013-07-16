(function(global, undefined) {
	"use strict";

	var name = 'Phidom',
	oldphi = global.phi,
	oldN = global[name],

	phi = function Phi(selector) {

			if (!(this instanceof phi)) {
				return new phi(selector);
			}

			var selection;

			if (typeof selector === 'string') {

				// Use Native ID if it is an ID
				if (/^#[\S]+$/.test(selector)) {
					selection = document.getElementById(selector.substr(1));
					if(selection) {
						this[0] = selection;
						this.length = 1;
						return this;
					} else {
						return [];
					}
				}

				// Use Native ClassName if it is a class name
				if (/^\.[\S]+$/.test(selector)) {

					selection = document.getElementsByClassName(selector.replace(/\./g, ' '));
				} else {

					// Use QSA for anything else
					selection = document.querySelectorAll(selector);
				}
				
			} else {

				selection = selector;
			}

			this.length = selection.length

			if (this.length) {
				for (var i = 0, len = this.length; i < len; i++) {
					this[i] = selection[i];
				}
			} else {
				this[0] = selection;
				this.length = 1;
			}

			return this;

		},

	// Feature Tests
	hasClassList = document.documentElement.classList;

	// Create a global reference to our library.
	global.phi = global[name] = phi;

	// Calling .noConflict will restore the global $ to its previous value.
	// Passing true will do that AND restore the full global name as well.
	// Returns a reference to your library's function.
	phi.noConflict = function( all ) {
		if ( all ) {
			global[name] = oldN;
		}
		global.phi = oldphi;
		return phi;
	};

	phi.fn = phi.prototype;

	phi.fn.each = function each(fn) {
		var matchedElements = this;
		for (var i = 0, len = this.length; i < len; i++) {

			var el = matchedElements[i];
			fn(el);
		}

		return this;
	};

	// ClassList manipulations

	function classList(action, className) {
		
		// Browsers that support ClassList use it
		// Action = [add, remove, toggle, contains]
		// Single selectors
		var classListFn;

		if(hasClassList) {
			classListFn = function(el) {
				return el.classList[action](className);
			};
		} else {
			classListFn = function(el) {

				// Check if the class exists
				var regexp = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g'),
					hasClass = el.className.match(regexp),

					toggleClass = function() {
						if (hasClass) {
							el.className = el.className.replace(regexp, '$2');
						} else {
							el.className += (el.className ? " " : "") + className;
						}
						return el.className;
					};

				if (action === 'add') {
					// Add class if it doesnt exist
					if (!hasClass) {
						el.className = toggleClass();
					}
				} else if(action === 'remove') {
					// Remove class if it exists
					if (hasClass) {
						el.className = toggleClass();
					}
				} else if(action === 'toggle') {
					// Toggle Class On / Off
					el.className = toggleClass();
				} else {
					// Contains the class
					return hasClass;
				}
			};
		}

		return classListFn;
	}

	phi.fn.hasClass = function hasClass(className) {
		
		// match all elements for class
		var matchedElements = this;

		for (var i = 0, len = this.length; i < len; i++) {

			var el = matchedElements[i];

			var hasClassName = classList('contains', className)(el);

			if(!hasClassName) {
				return false;
			}
		}

		return true;
	};

	phi.fn.addClass = function addClass(className) {
		
		var addFn = classList('add', className);
		return this.each(addFn);
	};

	phi.fn.removeClass = function removeClass(className) {

		var removeFn = classList('remove', className);
		return this.each(removeFn);
	};


	phi.fn.toggleClass = function toggleClass(className) {

		var toggleFn = classList('toggle', className);
		return this.each(toggleFn);
	};

	// Children Selector

	phi.fn.children = function() {
		var allChildren = [];

		this.each(function(el) {
			var children = el.children;
			if (children.length) {
				for( var i =0, len = children.length; i < len; i++) {
					allChildren.push(children[i]);
				}
			}
		});

		return phi(allChildren);
	};

	phi.fn.dataAttr = function(attr, val) {
		console.log(attr, val);
		if(val) {
			return this.each(function(el) {
				el.setAttribute('data-' + attr, val);
			});
		} else {
			var values = [];

			this.each(function(el) {
				values.push(el.getAttribute('data-' + attr));
			});

			return values;
		}
	};

	phi.fn.push = function() {
		//console.log(this);
	};

	phi.fn.splice = function() {
		//console.log(this);
	};

}(this));