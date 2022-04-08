import * as express from "express";
import { authenticateToken } from "../services/auth.service";
import productRouter from "./product.route";
import shopRouter from "./shop.route";
import userRouter from "./user.route";

const apiRouter = express.Router();

apiRouter.use('/user',authenticateToken,userRouter);
apiRouter.use('/shop',authenticateToken,shopRouter);
apiRouter.use('/product',authenticateToken,productRouter);


export default apiRouter;