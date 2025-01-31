import { parse, format, isValid } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import User from "../modules/user";
import { IAuthRequest } from "../middleware/auth";
import { Response, Request } from "express";

const showBookService = {
  async execute(req: IAuthRequest, res: Response): Promise<void> {
    if (!req.user) {
      res.status(401).json({ message: "Usuário não autenticado." });
      return;
    }

    const { day } = req.query; 

    if (!day || typeof day !== "string") {
      res.status(400).json({ message: "Dia inválido." });
      return;
    }

    const parseDate = (dateString: string): Date | null => {
      const formats = ["yyyy-MM-dd", "dd/MM/yyyy", "MM/dd/yyyy", "yyyy/MM/dd", "dd.MM.yyyy"];
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
      const user = await User.findById(req.user.id).lean();
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      const existingDay = user.days.find((d) => {
        const storedDate = toZonedTime(d.day, "UTC");
        return format(storedDate, "yyyy-MM-dd") === normalizedDay;
      });

      if (!existingDay) {
        res.status(404).json({ message: "Dia não encontrado." });
        return;
      }

      res.status(200).json({ books: existingDay.books });

    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      res.status(500).json({ message: "Erro interno ao buscar livros." });
    }
  },
};

export default showBookService;
