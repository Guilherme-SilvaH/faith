import User from "../modules/user";
import bcrypt from "bcryptjs";  // Para comparar a senha criptografada

const loginUserService = {
  async execute(userData: { email: string; password: string }) {
    // Verifica se o e-mail já está cadastrado
    const existingUser = await User.findOne({ email: userData.email });

    if (!existingUser) {
      throw new Error('Usuário não existe.');
    }

    // Verifica se a senha fornecida corresponde à senha armazenada (criptografada)
    const passwordMatch = await bcrypt.compare(userData.password, existingUser.password);

    if (!passwordMatch) {
      throw new Error('Senha incorreta.');
    }

    // Se tudo estiver certo, retorna o usuário (ou você pode gerar um token de autenticação, por exemplo)
    return {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      days: existingUser.days,
    };
  },
};

export default loginUserService;
