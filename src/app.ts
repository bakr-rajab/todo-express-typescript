import express, { Application, json } from "express"

import config from './config'

import mongoConnect from './db/connect'

import routes from './routes'



mongoConnect();

const app: Application = express();
const port: number = config.app.port as number;

app.use(json());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`The server is running on port ${port}...`);
});

export default app;