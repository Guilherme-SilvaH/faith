import { Router } from 'express';
import loginUserController from '../Controller/loginUserController';
import createUserController from '../Controller/createUserController';
import addBookController from '../Controller/addBookController'; 
import { Authenticate } from '../middleware/auth';
import showBookController from '../Controller/showBookController';


const userRouter = Router();

// Rota para cadastro de usuários
userRouter.post('/cadastro', createUserController);

// Rota para login de usuários
userRouter.post('/login', loginUserController);

// Rota para adicionar/atualizar dias e livros lidos
userRouter.post('/add-book', Authenticate, addBookController); // Protegida pelo middleware


//Rota para mostra os Livros
userRouter.post('/show-book', Authenticate, showBookController); // Protegida pelo middleware

export default userRouter;
