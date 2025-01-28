import { Request, Response } from "express";
import showBookService from "../services/showBook.service";

export default async function showBookController(req: Request, res: Response): Promise<void> {
  await showBookService.execute(req, res);
}
