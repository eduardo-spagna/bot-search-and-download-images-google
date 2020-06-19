const searchImages = require('./modules/searchImages');

const main = async () => {
  await searchImages.getImages();
}

main();