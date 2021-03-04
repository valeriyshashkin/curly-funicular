const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const { assert } = require('chai');

let window;
beforeEach(() => {
    window = (new JSDOM(fs.readFileSync(path.join(__dirname + '/index.html'), 'utf-8'), { runScripts: 'dangerously', querySelector: true })).window;
});

it('should do the right thing', () => {
    let element = window.document.querySelector('#menu > [data-cfmenuanchor="header"]');
    assert.equal(element.classList.contains('cfactive'), true);
});