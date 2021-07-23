import { Router, Request, Response } from "express";
import multer from "multer";
import multerConfig from "./config/multerConfig";

import { ListFilesService } from "./services/ListFilesService";
import { UploadFilesService } from "./services/UploadFilesService";
import { DayJSProvider } from "./lib/DayJSProvider";
import { FTPRepository } from "./repositories/implementations/FTPRepository";

import { categories } from "./data/static/db.json";

const filesRepository = new FTPRepository();
const dateProvider = new DayJSProvider();

const upload = multer(multerConfig);

const routes = Router();

routes.get("/", async (req: Request, res: Response) => {
  try {
    let { directory = "" } = req.query;

    const listFilesService = new ListFilesService(filesRepository);

    const listFiles = await listFilesService.execute(String(directory));

    res.json(listFiles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

routes.post(
  "/uploads",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      let params = {};
      let customFilename = "";

      const file = req.file;
      const { category_id, month, fiscal_year, filename } = req.body;

      if (!file) throw new Error("File is required.");

      const category = categories.find(
        (item) => item.id === Number(category_id)
      );

      if (!category) throw new Error("Directory is required");

      const convertMonth = dateProvider.getMonthByName(month);
      const fiscalYear = dateProvider.getYear(fiscal_year);

      if (!filename) {
        if (category.directory === "trasparencia") {
          customFilename = `${category.name}-${convertMonth}-${fiscalYear}`;
        } else {
          customFilename = file?.filename;
        }
      } else {
        customFilename = filename;
      }

      customFilename = customFilename.toUpperCase();

      params = { directory: category.directory, customFilename };

      return res.send(params);

      /* const uploadFiles = new UploadFilesService(filesRepository);

      if (!file) throw new Error("File is required");

      await uploadFiles.execute({
        file,
        params,
      });

      return res.send(); */
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }
);

routes.delete("/:filename", async (req: Request, res: Response) => {
  res.send();
});

export { routes };
