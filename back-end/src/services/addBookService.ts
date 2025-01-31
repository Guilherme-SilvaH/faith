import User from "../modules/user";
import { IAuthRequest } from "../middleware/auth";
import { Response } from "express";
import { parseISO, formatISO } from "date-fns";

const addBookService = {
  async execute(req: IAuthRequest, res: Response): Promise<void> {
    const { day, books } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Usuário não autenticado." });
      return;
    }

    if (!day || !Array.isArray(books) || books.length === 0) {
      res.status(400).json({ message: "Dia ou livros inválidos." });
      return;
    }

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      // Convertendo para Date e validando
      const parsedDate = parseISO(day);
      if (isNaN(parsedDate.getTime())) {
        res.status(400).json({ message: "Data inválida." });
        return;
      }

      // Criando data UTC (00:00:00)
      const [year, month, dayOfMonth] = day.split('-').map(Number);
      const utcDate = new Date(Date.UTC(year, month - 1, dayOfMonth));

      // Correção do tipo: assegurar que day é Date
      const existingDay = user.days.find(d => 
        d.day.toISOString().split('T')[0] === utcDate.toISOString().split('T')[0]
      );

      const uniqueBooks = [...new Set(books)];

      if (!existingDay) {
        user.days.push({ 
          day: utcDate,
          books: uniqueBooks
        });
      } else {
        const newBooks = uniqueBooks.filter(book => 
          !existingDay.books.includes(book)
        );
        existingDay.books.push(...newBooks);
      }

      await user.save();

      res.status(200).json({
        message: "Livros adicionados com sucesso!",
        addedBooks: uniqueBooks,
      });
    } catch (error) {
      console.error("Erro ao adicionar livros:", error);
      res.status(500).json({ message: "Erro ao adicionar livros." });
    }
  },
};

export default addBookService;