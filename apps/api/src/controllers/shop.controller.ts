import { Request, Response } from "express";
import shopService from "../services/shop.service";

class ShopController {
	public async getShopByName(req:Request,res:Response): Promise<void>{
		const { shopName } = req.params
		const response = await shopService.getShopByName(shopName)
		res.send(response);
	};

	public async getShops(req:any,res:Response): Promise<void>{
		console.log(req.user);
		const response = await shopService.getShops();
		res.send(response)
	}

	public async createShop(req:Request,res:Response): Promise<void>{
		const shopDto = req.body
		const response = await shopService.createShop(shopDto);
		res.send(response);
	}
};

const shopController = new ShopController();

export default shopController;