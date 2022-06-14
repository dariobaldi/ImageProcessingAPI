import express from 'express';
import resize_image from './image_processing';
const images = express.Router();

images.get('/', (req, res) => {
  const filename = req.query.filename as unknown as string;
  const width: number = parseInt(req.query.width as unknown as string);
  const height: number = parseInt(req.query.height as unknown as string);

  resize_image(filename, width, height);
  res.send('This is the images route');
});

export default images;
