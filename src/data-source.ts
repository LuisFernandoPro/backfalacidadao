import {DataSource} from "typeorm";
import User from "./models/user";

export const AppDataSource = new DataSource({
    type:"mysql",
    host:"localhost",
    port:3306,
    username: "root",
    password:"1234",
    database: "falacidadao",
    synchronize: true,
    logging:true,
    entities:[User],
    subscribers:[],
    migrations:[]
})
