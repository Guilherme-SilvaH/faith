import User from "../modules/user";
import { IAuthRequest } from "../middleware/auth";
import { Response } from "express";

const addBookService = {
  async execute(req: IAuthRequest, res: Response): Promise<void> {
    const { day, book } = req.body;

    console.log("Corpo da requisição:", req.body);

    if (!req.user) {
      res.status(401).json({ message: "Usuário não autenticado." });
      return;
    }

    if (!day || !book) {
      res.status(404).json({ message: "Dia ou Livro não inseridos." });
      return;
    }


    try {
      // Localiza o usuário pelo ID do token decodificado
      const user = await User.findById(req.user.id);

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      
      const normalizedDay = new Date(day).toISOString().split("T")[0];

      // Verifica se o dia já existe
      const existingDay = user.days.find(
        (d) => new Date(d.day).toISOString().split("T")[0] === normalizedDay
      );

      if (existingDay) {
        // Verifica se o livro já existe no dia
        const bookExists = existingDay.books.includes(book);
        if (bookExists) {
          res.status(400).json({ message: "Livro já adicionado neste dia." });
          return;
        }

        // Adiciona o livro ao dia existente
        existingDay.books.push(book);
      } else {
        // Cria um novo dia com o livro
        user.days.push({ day: normalizedDay, books: [book] });
      }

      // Salva as alterações no banco
      await user.save();

      res.status(200).json({ message: "Livro adicionado com sucesso!", user });
    } catch (error) {
      console.error("Erro ao adicionar livro:", error);
      res.status(500).json({ message: "Erro ao adicionar livro." });
    }
  },
};

export default addBookService;
