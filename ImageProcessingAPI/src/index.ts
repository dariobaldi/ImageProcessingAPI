import express from 'express';
import path from 'path';
import routes from './routes/index';

const app = express();
const port = 3000;

app.get('/', (_req: express.Request, res: express.Response) => {
  res.status(200).send('The server is working');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`ImageProcessingAPI app listening in port ${port}`);
});

