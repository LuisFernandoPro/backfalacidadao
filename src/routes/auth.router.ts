import { Router } from "express";
import UserController from "../controllers/user.controller";
import { upload } from "../config/multer-config"


const authRouter = Router();

authRouter.get('/login',new UserController().loginUser);
authRouter.post('/sign-up',new UserController().signUpUser);
authRouter.post('/batch-sign-up', upload.single('csvFile') , new UserController().signUpUsersInBatch);
authRouter.put('/update-image/:id', upload.single('image') , new UserController().updateUserImage);

export default authRouter;