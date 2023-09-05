import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
	async loginUser(req: Request, res: Response) {
		
		const {email, password} = req.body
		try {
		const token = await new UserService().LoginUser(email, password);
		res.json({token})
		} catch {
			res.status(401).send("Login falhou!")
		}
}
	async signUpUser(req: Request, res: Response) {
		try{
		const {name, email, password, cpf, funcao} = req.body
		await new UserService().signUpUser(name, email , password, cpf, funcao);
		res.json("Bem criado!")
	}
	catch (error) {
        console.log(`erro no controller signupuser ${error}`)
    }
}

	async signUpUsersInBatch(req:Request, res:Response) {
		console.log(req.file);
		await new UserService().signUpUsersInBatch(req);
		res.json("files");
	}
	
	async updateUserImage(req:Request, res:Response) {
		console.log(req.file);
		await new UserService().updateUserImage(req);
		res.json("files");
	}


}

export default UserController;