import { Client } from "basic-ftp";
import filesize from "filesize";
import path from "path";
import mime from "mime";
import fs from "fs";

import { appConfig } from "../../config/appConfig";
import { IUploadFilesDTO } from "../../dtos/IUploadFilesDTO";
import { IFilesRepositories } from "../IFilesRepositories";
import multerConfig from "../../config/multerConfig";

class FTPRepository implements IFilesRepositories {
  private client: Client;

  constructor() {
    this.client = new Client();
    this.client.ftp.verbose = false;
  }

  async list(directory: string): Promise<any> {
    await this.client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: Number(process.env.DEFAULT_PORT || 21),
    });

    const defaultFolder = process.env.DEFAULT_FOLDER || "";

    await this.client.cd(`${defaultFolder}/${directory}`);

    const listFtp = await this.client.list();

    const folderList = listFtp.map((item) => ({
      id: item.uniqueID,
      name: item.name.split(".")[0],
      filename: item.name,
      type: appConfig.ftp.type[item.type as keyof object],
      size: filesize(item.size),
    }));

    this.client.close();

    return folderList;
  }

  async saveFile({ filename, params }: IUploadFilesDTO): Promise<void> {
    const defaultFolder = process.env.DEFAULT_FOLDER || "";
    const { directory, customFilename = filename } = params;

    await this.client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: Number(process.env.DEFAULT_PORT || 21),
    });

    await this.client.cd(`${defaultFolder}/${directory}`);

    const originalPath = path.resolve(multerConfig.directory, filename);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) throw new Error("File not found!");

    await this.client.uploadFrom(originalPath, customFilename);

    await fs.promises.unlink(originalPath);
  }
}

export { FTPRepository };
