import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import  {IUser}  from '../modules/user';  // Assuming you have a User.ts file with the IUser interface

export interface IAuthRequest extends Request {
  user?: IUser;  
}

export function Authenticate(req: IAuthRequest, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];  // Example to get the token from the Authorization header

  if (!token) {
     res.status(401).json({ message: 'Token não fornecido' });
     return
  }

  try {
    const decoded = jwt.verify(token!, process.env.SECRET || '') as unknown as IUser;
    req.user = decoded;  
    next();
    return
  } catch (error) {
     res.status(401).json({ message: 'Token inválido ou expirado' });
     return
  }
}
