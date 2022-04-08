import * as express from "express";
import userController from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/",userController.createUser);

userRouter.get("/", userController.getUsers);

userRouter.get("/:userId", userController.getUserById);

export default userRouter
