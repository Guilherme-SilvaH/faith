import { Request, Response } from "express";

import createUserService from "../services/createUserService";
import loginUserService from "../services/loginUserService";


export default async function loginUserController(req: Request, res: Response): Promise<void> {
    const userData = req.body;
  
    try {
      await loginUserService.execute(userData);
      console.log('login com sucesso');
      res.status(201).json({ message: 'login com sucesso!' });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ message: 'Erro ao fazer login', error });
    }
  }