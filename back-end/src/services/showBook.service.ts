import { parse, format, isValid } from "date-fns";
import { toZonedTime } from "date-fns-tz"; // Importe a função para converter UTC para o fuso horário desejado
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
      // Usa .lean() para garantir que os dados venham sem metadados extras
      const user = await User.findById(req.user.id).lean();

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      // Debugging: Verificar os dias armazenados no banco de dados
      console.log("Dias no banco antes da formatação:", user.days);


      // Buscar o dia correspondente
      const existingDay = user.days.find((d) => {
        const storedDate = toZonedTime(d.day, "UTC"); // Converte a data para UTC
        const formattedStoredDate = format(storedDate, "yyyy-MM-dd"); // Formata a data
        console.log("Comparando:", formattedStoredDate, "com", normalizedDay);
        return formattedStoredDate === normalizedDay;
      });

      if (!existingDay) {
        res.status(404).json({ message: "Dia não encontrado." });
        return;
      }

      res.status(200).json({ books: existingDay.books });
      console.log("Dia encontrado:", existingDay);
      
    } catch (error) {
      console.error("Erro ao filtrar dia:", error);
      res.status(500).json({ message: "Erro ao filtrar dia." });
    }
  },
};

export default showBookService;