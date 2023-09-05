import express, {Request, Response,} from "express";
import cors from 'cors';
import userRouter from "../routes/user.router";
import morgan from 'morgan';
import logger from "./logger";
import authRouter from "../routes/auth.router";
import { validate } from "uuid";
import { validator } from "../controllers/auth.validator";

const app = express();
app.use(cors());
app.use(express.json());

app.use(morgan("combined"));

app.get('/name',(req: Request, res: Response) => {
    logger.info("Testando request name")
    res.json("falacidadao");
})

app.use('/users', validator);
app.use('/alunos', validator); //front end
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/alunos', (req: Request, res: Response) => { //front end
    res.json([])
})

export default app