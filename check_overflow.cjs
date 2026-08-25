const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 800 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  const result = await page.evaluate(() => {
    return {
      scrollWidth: document.body.scrollWidth,
      clientWidth: document.body.clientWidth,
      overflow: document.body.scrollWidth > document.body.clientWidth,
      elements: Array.from(document.querySelectorAll('*')).filter(el => el.scrollWidth > document.body.clientWidth).map(el => ({
        tag: el.tagName,
        className: el.className,
        width: el.getBoundingClientRect().width,
        scrollWidth: el.scrollWidth
      }))
    };
  });
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
