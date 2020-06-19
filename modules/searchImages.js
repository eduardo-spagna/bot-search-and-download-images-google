const puppeteer = require('puppeteer');
require('dotenv').config();

const pageAutoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

const getImages = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const searchNormalized = process.env.SEARCH.replace(' ', '+');
  const url = `https://www.google.com/search?q=${searchNormalized}&tbm=isch&oq=${searchNormalized}&sclient=img`;
  await page.goto(url);
  await pageAutoScroll(page);
  const imagesArray = await page.evaluate(() => Array.from(document.images, img => img.src));
  await browser.close();
  return imagesArray;
}

module.exports = { getImages };