# curly-funicular
## Usage
You will need to include the JavaScript file curly-funicular.js (or the minified version curly-funicular.min.js). No JQuery required!😊

### Including files
Place the script in front of the closing body tag.
```html
<script src="curly-funicular.js"></script>
```

### Required HTML structure
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

### Initialization
```javascript
curlyFunicular.init({
    anchors: ['#header', '#works', '#contacts'],
    offset: 200
});
```
### Accesing sections
In order to create links to a certain section, you can use a normal URL link if you are using curly-funicular with anchor links (using the `anchors` option), then you will be able to use anchor links also to navigate directly to a certain section. For example: http://example.com/index.html#page2


**Be careful!** `data-cfanchor` tags can not have the same value as any ID element on the site.

### Using a menu
To link the menu with the active section you will have to make use of anchor links (#) as explained below in the options section.

## Options
- `anchors`: (default `[]`) Defines the anchor links (#example) to be shown on the URL for each section. This option also allows users to bookmark a specific section. **Be careful!** if you use anchors, they can not have the same value as any ID element on the site.
- `offset`: (default `0`) Determines how much you need to scroll to the next section for the menu to become active on it. Calculated as the height of the section minus the offset. It is necessary for a better user experience, especially when the user scrolls to the last section. When clicking on an anchor link, scrolling does not take into account the offset.

## License
