(function(global, undefined) {
	"use strict";

	var name = 'Phidom',
	oldphi = global.phi,
	oldN = global[name],

	Phidom = function Phidom(matchedElements) {

			for (var i = 0, len = matchedElements.length; i < len; i++) {
				this[i] = matchedElements[i];
			}

			this.length = matchedElements.length;
		},

	phi = function(selector) {
			var matchedElements;
			if (typeof selector === 'string') {

				matchedElements= document.querySelectorAll(selector);
			} else {
				matchedElements = selector;

			}

			return new Phidom(matchedElements);
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


	Phidom.prototype.each = function each(fn) {
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


	Phidom.prototype.hasClass = function hasClass(className) {
		
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

	Phidom.prototype.addClass = function addClass(className) {
		
		var addFn = classList('add', className);
		return this.each(addFn);
	};

	Phidom.prototype.removeClass = function removeClass(className) {

		var removeFn = classList('remove', className);
		return this.each(removeFn);
	};


	Phidom.prototype.toggleClass = function toggleClass(className) {

		var toggleFn = classList('toggle', className);
		return this.each(toggleFn);
	};

	// Children Selector

	Phidom.prototype.children = function() {
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





	Phidom.prototype.push = function() {
		//console.log(this);
	};

	Phidom.prototype.splice = function() {
		//console.log(this);
	};


}(this));