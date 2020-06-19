const fs = require('fs');

const save = (images) => {
  for (let i = 0; i < images.length; i += 1) {
    const imageHref = images[i];

    // images with base64
    if (imageHref.includes(';base64,') === true) {
      const base64Image = imageHref.split(';base64,').pop();
      fs.writeFile(`images/image-${i}.png`, base64Image, { encoding: 'base64' }, function (error) {
        if (error) console.error('Error creating image', error);
      });
    }

    // images with url --> TODO
  }
};

module.exports = { save };