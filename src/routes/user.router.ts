import { Request, Response, Router } from "express";
import UserController from "../controllers/user.controller";
import { upload } from "../config/multer-config"
import { validator } from "../controllers/auth.validator";

const userRouter = Router();

//userRouter.use(validator)

userRouter.put('/update-image', upload.single('image') , new UserController().updateUserImage);
userRouter.get('/', (req: Request, res: Response) => res.status(200).send("OK"));  

export default userRouter;