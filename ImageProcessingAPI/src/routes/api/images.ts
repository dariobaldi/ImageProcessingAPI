import express from 'express';
import path from 'path';
import resizeImage from './imageProcessing';
const images = express.Router();

const assetsPath = path.resolve(__dirname, '../../../assets');

images.get('/', async (req, res) => {
  // Retrive variables from request's query
  const filename = req.query.filename as unknown as string;
  const width: number = parseInt(req.query.width as unknown as string);
  const height: number = parseInt(req.query.height as unknown as string);
  let format: string = req.query.format as unknown as string;

  const supportedFormats = ['jpg', 'jpeg', 'png', 'webp', 'tiff', 'gif'];

  //Check validity of query variables
  if (!width || !height) {
    res.status(400).send('Error: incorrect height or width (should be a number over 0)');
    res.end();
  } else if (!filename) {
    res.status(400).send('Error: No filename');
    res.end();
  }

  if (!format) {
    format = 'jpg';
  } else if (!supportedFormats.includes(format.toLowerCase())) {
    res.status(400).send(`Error: Image format *.${format} not supported`);
    res.end();
  }

  // Resize image
  try {
    const newImage = await resizeImage(filename, width, height, format);
    res.status(200).sendFile(`/lowres/${newImage}`, { root: assetsPath });
  } catch (error: unknown) {
    res.status(500).send(`Error: ${error}`);
    res.end();
  }
});

export default images;
