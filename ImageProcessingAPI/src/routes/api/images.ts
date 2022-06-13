import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
const images = express.Router();

images.get('/', (req, res) => {
  const filename = req.query.filename as unknown as string;
  const width: number = parseInt(req.query.width as unknown as string);
  const height: number = parseInt(req.query.height as unknown as string);

  resize_image(filename, width, height);
  res.send('This is the images route');
});

function resize_image(image: string, width: number, height: number) {
  const new_image = `${image}_${width}x${height}.jpg`;

  if (fs.existsSync('./assets/lowres/' + new_image)) {
    console.log('File already exists: ' + new_image);
    return true;
  }

  sharp('./assets/fullres/' + image + '.jpg')
    .resize(width, height)
    .toFile('./assets/lowres/' + new_image, function (err: Error) {
      if (err) {
        console.log(err);
      } else {
        console.log('Image converted: ' + new_image);
      }
    });
  return true;
}

export default images;
