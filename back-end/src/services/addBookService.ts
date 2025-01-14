import User from "../modules/user";

const addBookService = {
  async execute(userId: string, readingData: { day: string; books: string[] }) {
    const { day, books } = readingData;

    if (!day || !books || !Array.isArray(books) || books.some((b) => !b.trim())) {
      throw new Error("Dados de leitura inválidos: 'day' e 'books' são obrigatórios.");
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(`Usuário com ID ${userId} não encontrado.`);
      }

      const existingDay = user.days.find((reading) => reading.day === day);

      if (existingDay) {
        existingDay.books.push(...books);
        existingDay.books = [...new Set(existingDay.books)]; // Remove duplicados
      } else {
        user.days.push({ day, books });
      }

      await user.save();

      const action = existingDay ? "atualizados" : "adicionados";
      return {
        message: `Dia e livros ${action} com sucesso!`,
        user,
      };
    } catch (error) {
      console.error(`Erro ao adicionar livros para o usuário ${userId}:`, error);
      throw new Error(
        error instanceof Error
          ? `Erro ao adicionar livros: ${error.message}`
          : "Erro desconhecido ao adicionar livros."
      );
    }
  },
};

export default addBookService;
