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

  const supportedFormats = ['jpg','jpeg','png','webp','tiff','gif'];

  if ((!width) || (!height)) {
    res.status(500).send('Error: incorrect height or width for image');
    res.end()
  } else if (!filename) {
    res.status(500).send('Error: No filename');
    res.end()
  }

  if (!format){
    format = 'jpg';
  } else if (!supportedFormats.includes(format.toLowerCase())){
    res.status(500).send('Error: Image format not supported');
    res.end()
  }

  try {
    const newImage = await resizeImage(filename, width, height,format);
    res.status(200).sendFile('/lowres/' + newImage, { root: assetsPath });
  } catch (error: unknown){
    res.status(500).send(`Error (unkwon): ${error}`);
    res.end()
  }
});

export default images;
