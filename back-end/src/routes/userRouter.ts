import { Router } from 'express';
import loginUserController from '../Controller/loginUserController';
import createUserController from '../Controller/createUserController';

const userRouter = Router();

userRouter.post('/cadastro', createUserController);
userRouter.post('/login', loginUserController);

export default userRouter;
