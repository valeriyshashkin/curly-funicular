const puppeteer = require('puppeteer');
const path = require('path');

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

async function init(config) {
    await page.evaluate(c => curlyFunicular(c), config);
}

describe('Not scrolled enough', function () {
    it('To section 2', async function () {
        await init({
            menu: '#menu',
            anchors: ['#header', '#works', '#contacts']
        });

        await page.evaluate(_ => $(window).scrollTop($('[data-cfanchor]').eq(0).height() - 1));
        await page.waitForSelector('.cfactive[data-cfmenuanchor="header"]');
    });
});

describe('Scrolled enough', function () {
    it('To section 2', async function () {
        await init({
            menu: '#menu',
            anchors: ['#header', '#works', '#contacts']
        });

        await page.evaluate(_ => $(window).scrollTop($('[data-cfanchor]').eq(0).height()));
        await page.waitForSelector('.cfactive[data-cfmenuanchor="works"]');
    });
});
// it('selects the next menu item when scrolled enough', function () {
//     curlyFunicular({
//         menu: '#menu',
//         anchors: ['#header', '#works', '#contacts']
//     });

//     for (let i = 1; i < 3; i++) {
//         $(window).scrollTop($(document).find('[data-cfanchor]').height() * i - 1);
//         setTimeout(_ => {
//             assert.equal($(document).find('.cfactive').index(), i - 1);
//         });

//         $(window).scrollTop($(document).find('[data-cfanchor]').height() * i);
//         setTimeout(_ => {
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
//         setTimeout(_ => {
//             assert.equal($(document).find('.cfactive').index(), 0);
//         });

//         $(window).scrollTop($(document).find('[data-cfanchor]').height() - 200);
//         setTimeout(_ => {
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
//             setTimeout(_ => {
//                 assert.equal($(document).find('.cfactive').index(), i - 1);
//             });

//             $(window).scrollTop($(document).find('[data-cfanchor]').height() * i - 200);
//             setTimeout(_ => {
//                 assert.equal($(document).find('.cfactive').index(), i);
//             });
//         }
//     });
// });