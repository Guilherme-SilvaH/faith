import { Request, Response } from "express";

import createUserService from "../services/createUserService";


export default async function createUserController(req: Request, res: Response): Promise<void> {
    const userData = req.body;
  
    try {
      await createUserService.execute(userData);
      console.log('Usuário criado com sucesso');
      res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ message: 'Erro ao criar usuário', error });
    }
  }