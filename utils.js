(function (window, document, undefined) {
    'use strict';

    var utils = {
        delegate: function (criteria, listener) {
    		return function (e) {
    			var el = e.target;
    			do {
    				if (!criteria(el)) continue;
    				e.delegateTarget = el;
    				listener.apply(this, arguments);
    				return;
    			} while( (el = el.parentNode) );
    		};
    	},

        criteria: {
    		isAnElement: function (e) {
    			return e instanceof HTMLElement;
    		},
    		hasClass: function (cls) {
    			return function (e) {
    				return utils.criteria.isAnElement(e) && e.classList.contains(cls);
    			};
    		},
    		hasTagName: function (tag) {
    			return function (e) {
    				return utils.criteria.isAnElement(e) && e.nodeName === tag.toUpperCase();
    			};
    		},
    		hasTagNames: function (tags) {
    			if (tags.length > 0) {
    				return function (e) {
    					for (var i = 0, len = tags.length; i < len; i++) {
    						if (utils.criteria.isAnElement(e) && e.nodeName === tags[i].toUpperCase()) {
    							return utils.criteria.isAnElement(e) && e.nodeName === tags[i].toUpperCase();
    						}
    					}
    				};
    			}
    		}
    	},

        extend: function (defaults, options) {
            var extended = {};
            var prop;
            for (prop in defaults) {
                if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                    extended[prop] = defaults[prop];
                }
            }
            for (prop in options) {
                if (Object.prototype.hasOwnProperty.call(options, prop)) {
                    extended[prop] = options[prop];
                }
            }
            return extended;
        },

        isOverflowed: function (elem) {
            return (elem.offsetWidth < elem.scrollWidth);
        },

        getClosest: function (elem, selector) {
            var firstChar = selector.charAt(0);

            // Get closest match
            for (; elem && elem !== document; elem = elem.parentNode) {
                // If selector is a class
                if (firstChar === '.') {
                    if (elem.classList.contains( selector.substr(1))) {
                        return elem;
                    }
                }

                // If selector is an ID
                if (firstChar === '#') {
                    if (elem.id === selector.substr(1)) {
                        return elem;
                    }
                }

                // If selector is a data attribute
                if (firstChar === '[') {
                    if (elem.hasAttribute( selector.substr(1, selector.length - 2))) {
                        return elem;
                    }
                }

                // If selector is a tag
                if (elem.tagName.toLowerCase() === selector) {
                    return elem;
                }
            }

            return false;
        },
    };

	// Expose to interface
	if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = utils;
	} else if (typeof define === 'function' && define.amd) {
        define('utils', function ( ) { return utils; } );
	}

})(window, document);
