import { Op } from "sequelize";
import { CreateShopDto } from '@nx-test/shared-dto';
import { Product } from "@nx-test/shared-models";
import { Shop } from "@nx-test/shared-models";

class ShopService {
  public async getShops() {
    let candidates: Shop[] | null;
    try {
      candidates = await Shop.findAll({
		  include: Product,
	  });
      return { status: 200, message: "Success", shops:candidates };
    } catch (err) {
      return err;
    };
  };

  public async getShopByName(shopName: string) {
    let candidates: Shop[];
    try {
      candidates = await Shop.findAll({
        where: {
          name: {
			[Op.iLike]: `${shopName}%`
		  },
        },
		include: Product,
      });
      return { status: 200, message: "Success", shops:candidates };
    } catch (err) {
      return err;
    };
  };

  public async createShop(shopDto:CreateShopDto){
	  let candidate: Shop|null;
	  let dublicate: Shop|null;
	  		  
	  console.log(shopDto)
	  try{
		  dublicate = await Shop.findOne({
			  where:{
				  name: shopDto.name,
			  }
		  })
	  } catch (err) {
		  return(err);
	  };
	  if(dublicate){
		return { status: 409, message: "Shop with this name already exists" };
	  }

	  try {
		  // @ts-ignore 
		  candidate = await Shop.create(shopDto);
		  return candidate;
	  } catch (err){
		return { status: 500, message: "Error while creating shop" };
	  }
  }
};

const shopService = new ShopService();

export default shopService;
