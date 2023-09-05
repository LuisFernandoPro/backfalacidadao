import { v4 } from "uuid";
import { Request } from "express";
import csvParser from "csv-parser";
import fs from 'fs';
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import Jimp from "jimp";
import * as jwt from 'jsonwebtoken';

import User from "../models/user";
import userRepository from "../models/user.repository";
import logger from "../config/logger";
import { SECRET } from "../constants";

class UserService{

    getUserFromData(name: string, email: string, password: string, cpf: string, funcao: string) : User{
        const newUser = new User();
        newUser.id = v4();
        newUser.email = email;
        newUser.name = name;
        const hashDigest = sha256(password);
        logger.debug("HashAntes: ",hashDigest);
        const privateKey = "FIEC2023";
        const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, privateKey ));
        logger.debug("HashDepois: ",hashDigest);
        newUser.password = hmacDigest;
        newUser.cpf = cpf;
        newUser.funcao = funcao;
        return newUser;
    }
    
    async LoginUser(email: string, password: string): Promise<string>{
        const hashDigest = sha256(password);
        logger.debug("HashAntes: ",hashDigest);
        const privateKey = "FIEC2023";
        const passwordHashed = Base64.stringify(hmacSHA512(hashDigest, privateKey ));
        const foundUSer = await userRepository.findOneBy({email, password: passwordHashed});
        if(foundUSer){
        const jwtToken = jwt.sign({email: foundUSer?.email, id: foundUSer?.id}, SECRET, {expiresIn: 300});
        return jwtToken;
        }
        throw new Error("Usuario não encontrado");
    }

    async signUpUser(name: string, email: string, password: string, cpf: string, funcao: string){
        try {
        const newUser = this.getUserFromData(name, email, password, cpf, funcao);
        await userRepository.save(newUser);
    } catch (error) {
        console.log(`erro no service ${error}`)
    }
}

    async signUpUsersInBatch(req: Request){
        const file = req.file;
        const users : User[] = [];
        console.log(file)
        if(file != null) {
            fs.createReadStream(file.path)
                .pipe(csvParser({separator: ';'}))
                .on('data', (data) => users.push(this.getUserFromData(data.name, data.email, data.password, data.cpf, data.funcao))) //escrever
                .on('end', () => {
                console.log(users);
                userRepository.insert(users);
                });
                
        }
    }

    async updateUserImage(req: Request){
            const file = req.file;
            const {id} = (req as any).authUser;
        

            const foundUSer = await userRepository.findOneBy({id});
            if(file != null && foundUSer != null){
            const image = await Jimp.read(file.path);
            await image.resize(600,600);
            await image.write('uploads/' + file.originalname);
            foundUSer.imageUrl = file.originalname;
            await userRepository.save(foundUSer);
            }
    }

}

export default UserService

