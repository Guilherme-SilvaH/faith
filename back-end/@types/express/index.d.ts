// src/@types/express.d.ts
import { IUser } from '../../src/modules/user'; // Certifique-se de ajustar o caminho conforme a estrutura do seu projeto

declare global {
  namespace Express {
    interface Request {
      user: IUser; 
    }
  }
}
