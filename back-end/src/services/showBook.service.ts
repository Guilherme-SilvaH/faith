import { parse, format, isValid } from "date-fns";
import User from "../modules/user";
import { IAuthRequest } from "../middleware/auth";
import { Response } from "express";

const showBookService = {
  async execute(req: IAuthRequest, res: Response): Promise<void> {
    const { day } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Usuário não autenticado." });
      return;
    }

    if (!day || typeof day !== "string") {
      res.status(400).json({ message: "Dia inválido." });
      return;
    }

    // Função para tentar interpretar a data em vários formatos
    const parseDate = (dateString: string): Date | null => {
      const formats = [
        "yyyy-MM-dd", 
        "dd/MM/yyyy", 
        "MM/dd/yyyy", 
        "yyyy/MM/dd", 
        "dd.MM.yyyy", 
      ];

      for (const fmt of formats) {
        const parsedDate = parse(dateString, fmt, new Date());
        if (isValid(parsedDate)) {
          return parsedDate;
        }
      }

      return null; 
    };

    const parsedDate = parseDate(day);

    if (!parsedDate) {
      res.status(400).json({ message: "Formato de data inválido." });
      return;
    }

    const normalizedDay = format(parsedDate, "yyyy-MM-dd");

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      console.log("Dias no banco:", user.days.map(d => format(new Date(d.day), "yyyy-MM-dd")));
      console.log("Data normalizada:", normalizedDay);

      const existingDay = user.days.find(
        (d) => format(new Date(d.day), "yyyy-MM-dd") === normalizedDay
      );

      if (!existingDay) {
        res.status(404).json({ message: "Dia não encontrado." });
        return;
      }

      res.status(200).json({ books: existingDay.books });
      console.log(existingDay);
      
    } catch (error) {
      console.error("Erro ao filtrar dia:", error);
      res.status(500).json({ message: "Erro ao filtrar dia." });
    }
  },
};

export default showBookService;