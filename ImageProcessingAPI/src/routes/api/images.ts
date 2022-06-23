import express from 'express';
import path from 'path';
import resizeImage from './imageProcessing';
const images = express.Router();

const assetsPath = path.resolve(__dirname, '../../../assets');

images.get('/', async (req, res): Promise<void> => {
  // Retrive variables from request's query
  const filename = req.query.filename as unknown as string;
  const width: number = parseInt(req.query.width as unknown as string);
  const height: number = parseInt(req.query.height as unknown as string);
  let format: string = req.query.format as unknown as string;

  if (!format) {
    format = 'jpg';
  }

  const check_err = checkQueryParam(width, height, filename, format);

  if (check_err) {
    res.status(400).send(check_err);
    return;
  }

  // Resize image
  let newImage: string, err: string;
  [newImage, err] = await resizeImage(filename, width, height, format);

  if (newImage) {
    res.status(200).sendFile(`/lowres/${newImage}`, { root: assetsPath });
  } else if (err) {
    res.status(500).send(`Error: ${err}`);
  } else {
    res.status(500).send(`Error: No image returned from server`);
  }
  return;
});

//Check validity of query variables for image resizing
function checkQueryParam(
  width: number,
  height: number,
  filename: string,
  format: string
): string {
  const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif'];
  if (!width || !height) {
    return 'Error: incorrect height or width (should be a number over 0)';
  }

  if (!filename) {
    return 'Error: No filename';
  }

  if (!supportedFormats.includes(format.toLowerCase())) {
    return `Error: Image format *.${format} not supported`;
  }

  return '';
}

export default images;
