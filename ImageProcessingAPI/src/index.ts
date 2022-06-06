import express from 'express';
const app = express()
const port = 5050

app.get('/', (_req: express.Request, res: express.Response) => {
  res.status(200).send('The server is working')
})

app.listen(port, () => {
  console.log(`ImageProcessingAPI app listening in port ${port}`)
})