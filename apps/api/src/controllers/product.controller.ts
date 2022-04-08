import { Request, Response } from "express";
import productService from "../services/product.service";

class ProductController {
	public async getProducts(req:Request, res:Response){
		const response = await productService.getProducts();
		res.send(response)
	}

	public async createProduct(req:Request, res:Response){
		const productDto = req.body;
		const response = await productService.createProduct(productDto);
		res.send(response);
	}
}

const productController = new ProductController();

export default productController;