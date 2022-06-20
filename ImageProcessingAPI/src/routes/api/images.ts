import express from 'express';
import path from 'path';
import resizeImage from './image_processing';
const images = express.Router();

const assetsPath = path.resolve(__dirname, '../../../assets');

images.get('/', async (req, res) => {
  const filename = req.query.filename as unknown as string;
  const width: number = parseInt(req.query.width as unknown as string);
  const height: number = parseInt(req.query.height as unknown as string);
  let format: string = req.query.format as unknown as string;

  if ((!width) || (!height)) {
    res.status(500).send('Error: incorrect height or width for image');
  }

  if (!format){
    format = 'jpg';
  }

  try {
    const newImage = await resizeImage(filename, width, height,format);
    res.sendFile('/lowres/' + newImage, { root: assetsPath });
  } catch (error: unknown){
    res.status(500).send(error);
  }
});

export default images;
