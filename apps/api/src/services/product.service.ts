import { CreateProductDto } from '@nx-test/shared-dto';
import { Product } from "@nx-test/shared-models";

class ProductService {
	public async getProducts(){
		let candidates: Product[]| null;
		try {
			candidates = await Product.findAll();
			return { status: 200, message: "Success", candidates };
		} catch(err) {
			return err
		};
	};

	public async createProduct(productDto:CreateProductDto){
		let candidate: Product| null;
		try {
			// @ts-ignore
			candidate = await Product.create(productDto);
			return candidate;
		} catch(err){
			return err;
		}
	}
};

const productService = new ProductService();
export default productService;