const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setViewport({ width: 1366, height: 768 });
    await page.goto(path.join('file://', __dirname, '/index.html'));
    await page.screenshot({ path: 'example.png' });

    await browser.close();
})();