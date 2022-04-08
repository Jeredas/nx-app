import 'dotenv/config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { json } from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import { database } from '@nx-test/db-config';
import apiRouter from './routes/auth.route';

const app = express();

//DB
try {
  database
    .authenticate()
    .then(() => console.log('DB connected'))
    .catch((err: Error) => console.log(err));
} catch (err) {
  console.log(err);
}

//App
try {
  app.use(json());
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/auth', apiRouter);

  app.listen(process.env.AUTH_APP_PORT, () =>
    console.log(`Auth-Service is running on ${process.env.AUTH_APP_PORT}`)
  );
} catch (err) {
  console.log(err);
}
