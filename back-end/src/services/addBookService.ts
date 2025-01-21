import User from "../modules/user";
import { IAuthRequest } from "../middleware/auth";
import { Response } from "express";

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

      const normalizedDay = new Date(day).toISOString().split("T")[0];

      let existingDay = user.days.find(
        (d) => new Date(d.day).toISOString().split("T")[0] === normalizedDay
      );

      // Se o dia não existe, crie um novo
      if (!existingDay) {
        existingDay = { day: normalizedDay, books: [] };
        user.days.push(existingDay);
      }

      // Adiciona os livros, garantindo que não sejam duplicados
      books.forEach((book) => {
        if (!existingDay.books.includes(book)) {
          existingDay.books.push(book);
        }
      });

      await user.save(); // Atualiza o banco de dados

      res.status(200).json({
        message: "Livros adicionados com sucesso!",
        addedBooks: books,
      });
    } catch (error) {
      console.error("Erro ao adicionar livros:", error);
      res.status(500).json({ message: "Erro ao adicionar livros." });
    }
  },
};

export default addBookService;
