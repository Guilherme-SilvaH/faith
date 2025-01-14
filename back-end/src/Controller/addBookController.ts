import { Request, Response } from "express";
import addBookService from "../services/addBookService";

export default async function addBookController(req: Request, res: Response): Promise<void> {
  await addBookService.execute(req, res);
}
