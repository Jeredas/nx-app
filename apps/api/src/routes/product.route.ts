import * as express from 'express'
import productController from '../controllers/product.controller';

const productRouter = express.Router();

productRouter.get('/', productController.getProducts);
productRouter.post('/:productName',productController.createProduct)

export default productRouter