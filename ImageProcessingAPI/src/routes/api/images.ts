import express from 'express';
const images = express.Router();

images.get('/', (req, res) => {
  res.send('This is the images route');
});

export default images;
