import { Router, Request, Response } from "express";

import { ListFilesService } from "./services/ListFilesService";
import { FTPRepository } from "./repositories/implementations/FTPRepository";

const filesRepository = new FTPRepository();

import multer from "multer";
import fs from "fs";

const upload = multer();

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
  try {
    const listFilesService = new ListFilesService(filesRepository);

    const listFiles = await listFilesService.list();

    res.json(listFiles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

routes.post("/uploads", upload.any(), async (req: Request, res: Response) => {
  try {
    const files = req.files;

    console.log(files);

    return res.status(200).json({ files });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

export { routes };
