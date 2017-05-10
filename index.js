/*! Collapsible Menu - v1.1
 *  Copyright (c) 2016-2017 Mattias Hinderson
 *  License: MIT
 */

// Polyfill .closest()
if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i,
            el = this;
        do {
            i = matches.length;
            while (--i >= 0 && matches.item(i) !== el) {};
        } while ((i < 0) && (el = el.parentElement));
        return el;
    };
}

// Polyfill .matches()
const matches = document.body.matchesSelector || document.body.webkitMatchesSelector || document.body.mozMatchesSelector || document.body.msMatchesSelector || document.body.webkitMatchesSelector || document.body.matchesSelector;

// Helpers
const isOverflowed = elem => elem.offsetWidth < elem.scrollWidth;

// Constructor
const CollapsibleMenu = (query, options = {}) => {
    const $elem = (typeof query === 'string' ? document.querySelector(query) : query);

    let breakpoint = null;

    // Extend default options
    Object.assign(options, {
        selectedItem: '[aria-selected="true"]',
        toggledClass: 'is-toggled',
        collapsedClass: 'is-collapsed'
    });

    function toggleMenu (e) {
        if (matches.apply(e.target, [options.selectedItem])) {
            $elem.classList.toggle(options.toggledClass);
            e.preventDefault();
        }
    }

    function closeMenu (e) {
        if ($elem.classList.contains(options.toggledClass) && e.target.closest(query) !== $elem) {
            $elem.classList.remove(options.toggledClass);
        }
    }

    function enableClick () {
        $elem.addEventListener('click', toggleMenu);
        document.body.addEventListener('click', closeMenu);
    }

    function disableClick () {
        $elem.removeEventListener('click', toggleMenu);
        document.body.removeEventListener('click', closeMenu);
    }

    function checkOverflow (viewportWidth) {
        if (!$elem) { return; }

        viewportWidth = viewportWidth || window.innerWidth;

        if (!$elem.classList.contains(options.collapsedClass) && isOverflowed($elem)) {
            breakpoint = $elem.scrollWidth;
            $elem.classList.add(options.collapsedClass);
            enableClick();
        } else if (breakpoint < viewportWidth) {
            breakpoint = null;
            $elem.classList.remove(options.collapsedClass);
            disableClick();
        }

        $elem.classList.remove(options.toggledClass);
    }

    return { toggleMenu, checkOverflow };
};

export default CollapsibleMenu;
