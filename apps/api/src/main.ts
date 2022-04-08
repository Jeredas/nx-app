import 'dotenv/config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { json } from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import { database } from '@nx-test/db-config';
import apiRouter from './routes/api.route';
// import { authenticateToken } from './services/auth.service';
import * as jwt from 'jsonwebtoken';
import { authenticateToken } from './services/auth.service';

// const dotenv = require("dotenv");
// dotenv.config();
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
  app.use('/api', apiRouter);

  app.listen(process.env.APP_PORT, () =>
    console.log(`Server is running on ${process.env.APP_PORT}`)
  );
} catch (err) {
  console.log(err);
}
