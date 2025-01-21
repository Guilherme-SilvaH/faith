import User from "../modules/user";
import { IAuthRequest } from "../middleware/auth";
import { Response } from "express";

const addBookService = {
  async execute(req: IAuthRequest, res: Response): Promise<void> {
    const { day, books } = req.body; // Ajustado para receber 'books' como array

    console.log("Corpo da requisição:", req.body);

    if (!req.user) {
      res.status(401).json({ message: "Usuário não autenticado." });
      return;
    }

    if (!day || !Array.isArray(books) || books.length === 0) {
      res.status(404).json({ message: "Dia ou Livros não inseridos." });
      return;
    }

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      const normalizedDay = new Date(day).toISOString().split("T")[0];

      // Localiza ou cria o dia
      let existingDay = user.days.find(
        (d) => new Date(d.day).toISOString().split("T")[0] === normalizedDay
      );

      if (!existingDay) {
        existingDay = { day: normalizedDay, books: [] };
        user.days.push(existingDay);
      }

      // Adiciona os livros, verificando duplicados
      books.forEach((book) => {
        if (!existingDay.books.includes(book)) {
          existingDay.books.push(book);
        }
      });

      // Salva as alterações no banco
      await user.save();

      res.status(200).json({ message: "Livros adicionados com sucesso!", user });
    } catch (error) {
      console.error("Erro ao adicionar livros:", error);
      res.status(500).json({ message: "Erro ao adicionar livros." });
    }
  },
};

export default addBookService;

