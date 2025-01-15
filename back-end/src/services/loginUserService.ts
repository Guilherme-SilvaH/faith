import User from "../modules/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Definindo o tipo para os dados do usuário no login
interface IUserData {
  email: string;
  password: string;
}

const loginUserService = {
  async execute(userData: IUserData) {
    try {
      // Verifica se o e-mail já está cadastrado
      const existingUser = await User.findOne({ email: userData.email });

      if (!existingUser) {
        throw new Error("Usuário não encontrado.");
      }

      // Verifica se a senha fornecida corresponde à senha armazenada (criptografada)
      const passwordMatch = await bcrypt.compare(userData.password, existingUser.password);

      if (!passwordMatch) {
        throw new Error("Senha incorreta.");
      }

      // Gera o token JWT com mais informações (como email ou nome, se necessário)
      const payload = {
        id: existingUser._id,
      };

      const token = jwt.sign(payload, process.env.Secret as string, {
        expiresIn: "2h",
      });

      // Retorna os dados necessários para o login
      return {
        token,
        user: {
          id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          days: existingUser.days,
        },
      };
    } catch (error) {
      // Lança o erro com uma mensagem mais detalhada
      throw new Error(`Erro no login: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  },
};

export default loginUserService;
