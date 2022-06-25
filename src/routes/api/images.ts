import express from 'express';
import path from 'path';
import { resizeImage, checkImageQueryParam } from './imagesProcessing';
const images = express.Router();

const assetsPath = path.resolve(__dirname, '../../../assets');

images.get(
  '/',
  async (req: express.Request, res: express.Response): Promise<void> => {
    // Retrive variables from request's query
    const filename = req.query.filename as unknown as string;
    const width: number = parseInt(req.query.width as unknown as string);
    const height: number = parseInt(req.query.height as unknown as string);
    let format: string = req.query.format as unknown as string;

    if (!format) {
      format = 'jpg'; //Default to jpg when format not provided
    }

    const checkErr: string = checkImageQueryParam(
      width,
      height,
      filename,
      format
    );

    if (checkErr) {
      res.status(400).send(checkErr);
      return;
    }

    // Resize image
    try {
      const newImage = await resizeImage(filename, width, height, format);
      res.status(200).sendFile(`/lowres/${newImage}`, { root: assetsPath });
    } catch (err) {
      res.status(500).send(`${err}`);
    }
    return;
  }
);

export default images;
