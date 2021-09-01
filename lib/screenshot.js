const chromium = require('chrome-aws-lambda');
let _page;

async function getPage() {
    if (_page) {
        return _page;
    }

    const browser = await chromium.puppeteer.launch({
        args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
    })
    _page = await browser.newPage();
    await _page.setViewport({
        width: 1200,
        height: 630,
        deviceScaleFactor: 2,
    });

    return _page;
}

module.exports = (async (html) => {
    const page = await getPage();

    await page.setContent(html);

    return await page.screenshot({ type: 'jpeg' });
});