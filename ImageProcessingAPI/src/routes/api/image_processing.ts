import sharp from 'sharp';
import fs from 'fs';

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
  
  export default resize_image;