import sharp from 'sharp';
import fs from 'fs';

const resizeImage = async (
  image: string,
  width: number,
  height: number,
  format: string
): Promise<string> => {
  const newImage = `${image}_${width}x${height}.${format}`;

  // Check if image file exists
  if (!fs.existsSync(`./assets/fullres/${image}.${format}`)) {
    throw `File ${image}.${format} doesn't exists.`;
  }

  // Check if resized image file exists
  if (fs.existsSync(`./assets/lowres/${newImage}`)) {
    return newImage;
  }

  // Resize image
  const resizing = await sharp(`./assets/fullres/${image}.${format}`)
    .resize(width, height)
    .toFile(`./assets/lowres/${newImage}`);

  if (resizing) {
    return newImage;
  } else {
    throw `Unkown error creating lowres image`;
  }
};

export default resizeImage;
