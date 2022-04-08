import * as express from 'express';
import authController from '../controllers/auth.controller';

const authRouter = express.Router()

authRouter.post('/login',authController.login);
authRouter.post('/signup',authController.signUp);

export default authRouter;