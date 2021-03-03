# Usage
You will need to include the JavaScript file curly-funicular.js (or the minified version curly-funicular.min.js). No JQuery required!😊

## Including files
Place the script in front of the closing body tag.
```html
<script src="curly-funicular.js"></script>
```

## Required HTML structure
Declare the menu with id, href links, data-cfmenuanchor menu items with the pre-defined active style in this way.
```html
<div id="menu">
    <div class="active" data-cfmenuanchor="first">
        <a href="#first">
            First
        </a>
    </div>
    <div data-cfmenuanchor="second">
        <a href="#second">
            Second
        </a>
    </div>
    <div data-cfmenuanchor="third">
        <a href="#third">
            Third
        </a>
    </div>
</div>
```
Each section will be defined with a div containing the data-cfanchor property. The active section by default will be the first section.
```html
<div data-cfanchor="first">Some section</div>
<div data-cfanchor="second">Some section</div>
<div data-cfanchor="third">Some section</div>
```

## Initialization
```javascript
curlyFunicular.init({
    menu: '#menu',
    anchors: ['#header', '#works', '#contacts']
});
```