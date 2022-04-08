import userService from "../services/user.service"

 class UserController {
	public getUsers  = async(req:any,res:any)=>{
		const response =  await userService.getUsers()
		res.send(response);
	}

	public getUserById  = async(req:any,res:any)=>{
		const { userId } = req.params
		const response =  await userService.getUserById(userId)
		res.send(response);
	}

	public createUser  = async(req:any,res:any)=>{
		const userDto = req.body;
		const response =  await userService.createUser(userDto)
		res.send(response);
	}
}

const userController = new UserController()
export default userController;