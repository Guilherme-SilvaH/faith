import User from "../modules/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv-safe";

dotenv.config();

const loginUserService = {
  async execute(userData: { email: string; password: string }) {
    // Verifica se o e-mail já está cadastrado
    const existingUser = await User.findOne({ email: userData.email });

    if (!existingUser) {
      throw new Error("Usuário não existe.");
    }

    // Verifica se a senha fornecida corresponde à senha armazenada (criptografada)
    const passwordMatch = await bcrypt.compare(userData.password, existingUser.password);

    if (!passwordMatch) {
      throw new Error("Senha incorreta.");
    }

    // Gera o token JWT
    const token = jwt.sign({ id: existingUser._id }, process.env.Secret as string, {
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
  },
};

export default loginUserService;
