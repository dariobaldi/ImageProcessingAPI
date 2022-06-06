import express from 'express';
import images from './api/images';
const routes = express.Router();

routes.get('/', (_req: express.Request, res: express.Response) => {
  res.status(200).send('Main API route');
});

routes.use('/images', images);

export default routes;
