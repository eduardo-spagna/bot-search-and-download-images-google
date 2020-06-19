const searchImages = require('./modules/searchImages');
const saveImages = require('./modules/saveImages');

const main = async () => {
  const images = await searchImages.getImages();
  saveImages.save(images);
}

main();