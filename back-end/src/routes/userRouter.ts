import { Router } from 'express';
import loginUserController from '../Controller.ts/loginUserController';
import createUserController from '../Controller.ts/createUserController';

const userRouter = Router();

userRouter.post('/cadastro', createUserController);
userRouter.post('/login', loginUserController);

export default userRouter;
