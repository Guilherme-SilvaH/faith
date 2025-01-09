import { Request, Response } from "express";
import loginUserService from "../services/loginUserService";

export default async function loginUserController(req: Request, res: Response): Promise<void> {
  const userData = req.body;

  try {
    // Chama o serviço de login
    const { token, user } = await loginUserService.execute(userData);

    // Retorna o token e os dados do usuário
    res.status(200).json({
      message: "Login realizado com sucesso!",
      auth: true,
      token,
      user,
    });
  } catch (error: any) {
    // Erros personalizados
    if (error.message === "Usuário não existe." || error.message === "Senha incorreta.") {
      res.status(401).json({ message: error.message });
    } else {
      // Erros gerais
      console.error("Erro ao fazer login:", error);
      res.status(500).json({ message: "Erro ao fazer login." });
    }
  }
}
