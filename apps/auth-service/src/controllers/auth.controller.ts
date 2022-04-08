import { Request, Response } from "express";
import authService from "../services/auth.service";


export class AuthController {
	public async login(req:Request,res:Response){
		const loginDto = req.body;
		const response = await authService.signIn(loginDto);
		res.send(response);
	}

	public signUp  = async(req:any,res:any)=>{
		const userDto = req.body;
		const response =  await authService.signUp(userDto)
		res.send(response);
	}
}

const authController = new AuthController();
export default authController;