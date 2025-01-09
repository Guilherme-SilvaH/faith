import { Request, Response } from "express";


export default async function addBookController(req: Request, res: Response): Promise<void> {
    const userData = req.body;
  
    try {
      await addBookService.execute(userData);
      console.log('Livro adcionado com suceeso');
      res.status(201).json({ message: 'Livro adcionado com suceeso!' });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ message: 'Erro ao adicionar o livro', error });
    }
  }