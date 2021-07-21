import ftp, { Client } from "basic-ftp";
import filesize from "filesize";

import { appConfig } from "../../config/appConfig";
import { IFilesRepositories } from "../IFilesRepositories";

class FTPRepository implements IFilesRepositories {
  private client: Client;
  constructor() {
    this.client = new Client();
    this.client.ftp.verbose = false;
  }

  async list(): Promise<any> {
    await this.client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      port: Number(process.env.DEFAULT_PORT || 21),
    });

    await this.client.cd(process.env.DEFAULT_FOLDER || "");

    const listFtp = await this.client.list();

    const folderList = listFtp.map((item) => ({
      id: item.uniqueID,
      name: item.name,
      type: appConfig.type[item.type as keyof object],
      size: filesize(item.size),
    }));

    console.log(listFtp);

    this.client.close();

    return folderList;
  }
  uploadFrom(path: string): Promise<any> {
    // await client.uploadFrom(
    //   fs.createReadStream("test/to_upload.txt"),
    //   "uploaded.txt"
    // );

    // await client.downloadTo(
    //   fs.createWriteStream("test/downloaded.txt"),
    //   "README.txt",
    //   0
    // );

    throw new Error("Method not implemented.");
  }
}

export { FTPRepository };
