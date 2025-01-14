import { Response } from 'express';
import  {IAuthRequest}  from '../middleware/auth';  // Certifique-se de importar a interface correta
import addBookService from '../services/addBookService';

export default async function addBookController(req: IAuthRequest, res: Response): Promise<void> {
  try {
    if (!req.user || typeof req.user === 'string' || !('id' in req.user)) {
      res.status(401).json({ message: 'Usuário não autenticado ou token inválido.' });
      return;
    }

    const userId = req.user.id;
    const { day, books } = req.body;

    if (!day || !books || !Array.isArray(books)) {
      res.status(400).json({ message: "Dados inválidos. Certifique-se de incluir 'day' e 'books' corretamente." });
      return;
    }

    const result = await addBookService.execute(userId, { day, books });

    res.status(201).json(result);
  } catch (error) {
    console.error('Erro ao adicionar o livro:', error);
    if (error instanceof Error) {
      console.log(res.status(500).json({ message: 'Erro ao adicionar o livro', error: error.message }))
    } else {
      res.status(500).json({ message: 'Erro inesperado ao adicionar o livro' });
    }
  }
}
