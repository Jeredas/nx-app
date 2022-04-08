import * as express from 'express';
import shopController from '../controllers/shop.controller';
import { authenticateToken } from '../services/auth.service';


const shopRouter = express.Router();


shopRouter.get('/',authenticateToken,shopController.getShops);

shopRouter.get(`/:shopName`, shopController.getShopByName);

shopRouter.post('/',shopController.createShop);

export default shopRouter;