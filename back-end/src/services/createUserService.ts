import User from "../modules/user";


const creatUserService = {
  async execute(userData: { id: string, name: string; email: string; password:string; days?: [] }) {
    // Verifica se o e-mail já está cadastrado
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new Error('Usuário com esse e-mail já existe.');
    }

    // Cria um novo usuário
    const newUser = new User({
      id: userData.id,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      days: userData.days || [],
    });

    await newUser.save();
    return newUser;
  },
};

export default creatUserService;