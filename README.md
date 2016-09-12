# collapsible-menu
Dead-simple responsive navigation: checks if a menu is overflowing and appends a class name. Also supports toggling of menu.

## Example usage

Consider the following HTML markup for a simple website navigation:
```
<nav class="nav-primary">
    <ul>
        <li><a href="/">Menu item</a></li>
        <li class="is-selected"><a href="/">Menu item</a></li>
        <li><a href="/">Menu item</a></li>
        <li><a href="/">Menu item</a></li>
    </ul>
</nav>
```

### JavaScript
Require the module with the CommonJS or AMD module formats.

An example with CommonJS require:
```
var CollapsibleMenu = require('collapsible-menu');

var mainMenu = new CollapsibleMenu('.nav-primary');
mainMenu.checkOverflow();
```

The constructor accepts an optional secondary argument of settings/options which comes with the following default values:
```
{
    selectedClass: 'is-selected',
    toggledClass: 'is-toggled',
    collapsedClass: 'is-collapsed'
}
```

To check if menu is overflowing after the user has resized the browser, use an event listener on the window object and call the `checkOverflow()` method:
```
window.addEventListener('resize', function ( ) {
    mainMenu.checkOverflow(window.innerWidth):
});
```

(You should always use a debounce function on the resize event to avoid a performance hit.)

### CSS

Example usage:

```
.nav-primary ul {
    white-space: nowrap;
}

.nav-primary li {
    display: inline;
}

.nav-primary.is-collapsed ul {
    white-space: inherit;
    overflow: hidden;
}

.nav-primary.is-collapsed li {
    display: inline-block;
    width: 100%;
}

.nav-primary.is-collapsed li:not(.is-selected) {
    display: none;
}

/* Moves the selected menu item to the top of the list */
.nav-primary.is-toggled ul {
    display: table;
    caption-side: top;
    width: 100%;
}

.nav-primary.is-toggled li.is-selected {
    display: table-caption;
}
```
