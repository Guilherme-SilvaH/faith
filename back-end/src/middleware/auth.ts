import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv-safe";

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    // Verifica o token
    const decoded = jwt.verify(token.split(" ")[1], process.env.Secret as string);
    req.user = decoded; // Adiciona os dados do token no objeto `req` (por exemplo, o ID do usuário)
    next(); // Continua para a próxima função
  } catch (error) {
    res.status(401).json({ message: "Token inválido ou expirado." });
  }
};

export default authMiddleware;
