import User from "../modules/user";

const addBookService = {
  async execute(userId: string, readingData: { day: string; books: string[] }) {
    try {
      const { day, books } = readingData;

      const user = await User.findById(userId);

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const existingDay = user.days.find((reading) => reading.day === day);

      if (existingDay) {
        existingDay.books.push(...books);
        existingDay.books = [...new Set(existingDay.books)]; // Remove duplicados
      } else {
        user.days.push({ day, books });
      }

      await user.save();

      return {
        message: "Dia e livros adicionados/atualizados com sucesso!",
        user,
      };
    } catch (error) {
      // Verifica se `error` é uma instância de Error
      if (error instanceof Error) {
        throw new Error(`Erro ao adicionar livros: ${error.message}`);
      } else {
        throw new Error("Erro desconhecido ao adicionar livros.");
      }
    }
  },
};

export default addBookService;
