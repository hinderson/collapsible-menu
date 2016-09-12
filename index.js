/*! Collapsible Menu - v1
 *  Copyright (c) 2016 Mattias Hinderson
 *  License: MIT
 */

(function (window, factory) {
    'use strict';

    if (typeof define == 'function' && define.amd) {
        define(['./utils'], function(utils) {
            return factory(window, utils);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(
            window,
            require('./utils')
        );
    }

}(window, function factory (window, utils) {
    'use strict';

    var CollapsibleMenu = function (elemSelector, options) {
        var elem = document.querySelector(elemSelector);
        var breakpoint = null;

        var defaults = {
            selectedClass: 'is-selected',
            toggledClass: 'is-toggled',
            collapsedClass: 'is-collapsed'
        };

        options = utils.extend(defaults, options || {});

        return {
            toggleMenu: utils.delegate(utils.criteria.hasClass(options.selectedClass), function (e) {
                this.classList.toggle(options.toggledClass);
                e.preventDefault();
            }),
            enableClick: function ( ) {
                elem.addEventListener('click', this.toggleMenu);
                document.body.addEventListener('click', this.closeMenu = function (e) {
                    if (elem.classList.contains(options.toggledClass) && utils.getClosest(e.target, elemSelector) !== elem) {
                        elem.classList.remove(options.toggledClass);
                    }
                }.bind(this));
            },
            disableClick: function ( ) {
                elem.removeEventListener('click', this.toggleMenu);
                document.body.removeEventListener('click', this.closeMenu);
            },
            checkOverflow: function (viewportWidth) {
                if (!elem) { return; }

                viewportWidth = viewportWidth || window.innerWidth;

                if (!elem.classList.contains(options.collapsedClass) && utils.isOverflowed(elem)) {
                    breakpoint = elem.scrollWidth;
                    elem.classList.add(options.collapsedClass);
                    this.enableClick();
                } else if (breakpoint < viewportWidth) {
                    breakpoint = null;
                    elem.classList.remove(options.collapsedClass);
                    this.disableClick();
                }

                elem.classList.remove(options.toggledClass);
            }
        };
    };


    // Expose to interface
	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = CollapsibleMenu;
	} else if (typeof define === 'function' && define.amd) {
		define('CollapsibleMenu', function ( ) { return CollapsibleMenu; } );
	}
}));
