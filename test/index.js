const puppeteer = require('puppeteer');
const path = require('path');
const { assert } = require('chai');

describe('Select the active menu item when scrolling', function () {
    let browser;
    let page;

    before(async function () {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto(path.join('file://', __dirname, '/index.html'));
    });

    after(async function () {
        await page.close();
        browser.close();
    });

    // describe('Without offset', function () {
    it('selects the same menu item when not scrolled enough', async function () {
        await page.evaluate(() => {
            curlyFunicular({
                menu: '#menu',
                anchors: ['#header', '#works', '#contacts']
            });
        });

        await page.evaluate(() => {
            window.scrollTo(0, window.document.querySelector('[data-cfanchor]').offsetHeight - 1);
        });
        let result = await page.$eval('.cfactive', el => {
            function indexInParent(node) {
                var children = node.parentNode.childNodes;
                var num = 0;
                for (var i = 0; i < children.length; i++) {
                    if (children[i] == node) return num;
                    if (children[i].nodeType == 1) num++;
                }
                return -1;
            }
            return indexInParent(el);
        });
        assert.equal(result, 0);

        await page.evaluate(() => {
            window.scrollTo(0, window.document.querySelector('[data-cfanchor]').offsetHeight);
        });
        await page.waitForSelector('.cfactive[data-cfmenuanchor="works"]');
        result = await page.$eval('.cfactive', el => {
            function indexInParent(node) {
                var children = node.parentNode.childNodes;
                var num = 0;
                for (var i = 0; i < children.length; i++) {
                    if (children[i] == node) return num;
                    if (children[i].nodeType == 1) num++;
                }
                return -1;
            }
            return indexInParent(el);
        });
        assert.equal(result, 1);
    });
    // it('selects the next menu item when scrolled enough', function () {
    //     curlyFunicular({
    //         menu: '#menu',
    //         anchors: ['#header', '#works', '#contacts']
    //     });

    //     for (let i = 1; i < 3; i++) {
    //         $(window).scrollTop($(document).find('[data-cfanchor]').height() * i - 1);
    //         setTimeout(() => {
    //             assert.equal($(document).find('.cfactive').index(), i - 1);
    //         });

    //         $(window).scrollTop($(document).find('[data-cfanchor]').height() * i);
    //         setTimeout(() => {
    //             assert.equal($(document).find('.cfactive').index(), i);
    //         });
    //     }
    // });
    // });
    // describe('With offset', function () {
    //     it('selects the same menu item when not scrolled enough with offset', function () {
    //         curlyFunicular({
    //             menu: '#menu',
    //             anchors: ['#header', '#works', '#contacts'],
    //             offset: 200
    //         });

    //         $(window).scrollTop($(document).find('[data-cfanchor]').height() - 201);
    //         setTimeout(() => {
    //             assert.equal($(document).find('.cfactive').index(), 0);
    //         });

    //         $(window).scrollTop($(document).find('[data-cfanchor]').height() - 200);
    //         setTimeout(() => {
    //             assert.equal($(document).find('.cfactive').index(), 1);
    //         });
    //     });
    //     it('selects the next menu item when scrolled enough with offset', function () {
    //         curlyFunicular({
    //             menu: '#menu',
    //             anchors: ['#header', '#works', '#contacts'],
    //             offset: 200
    //         });

    //         for (let i = 1; i < 3; i++) {
    //             $(window).scrollTop($(document).find('[data-cfanchor]').height() * i - 201);
    //             setTimeout(() => {
    //                 assert.equal($(document).find('.cfactive').index(), i - 1);
    //             });

    //             $(window).scrollTop($(document).find('[data-cfanchor]').height() * i - 200);
    //             setTimeout(() => {
    //                 assert.equal($(document).find('.cfactive').index(), i);
    //             });
    //         }
    //     });
    // });
});