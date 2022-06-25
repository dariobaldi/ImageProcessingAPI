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
    throw `File ${image}.${format} doesn't exists on the assets folder.`;
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
    throw `The lowres image could not be created.`;
  }
};

//Check validity of query variables for image resizing
function checkImageQueryParam(
  width: number,
  height: number,
  filename: string,
  format: string
): string {
  const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif'];
  if (!width || !height) {
    return 'Incorrect height or width (should be a number over 0)';
  }

  if (!filename) {
    return 'No filename provided';
  }

  if (!supportedFormats.includes(format.toLowerCase())) {
    return `Image format *.${format} not supported`;
  }

  return '';
}

export { resizeImage, checkImageQueryParam };
