import AWS, { S3 } from "aws-sdk";
import path from "path";
import mime from "mime";
import fs from "fs";

import multerConfig from "../../config/multerConfig";

import { IUploadFilesDTO } from "../../dtos/IUploadFilesDTO";
import { IFilesRepositories } from "../IFilesRepositories";

class AWSRepository implements IFilesRepositories {
  private client: S3;

  constructor() {
    this.client = new AWS.S3({
      region: "us-east-1",
    });
  }

  list(): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async saveFile({ filename }: IUploadFilesDTO): Promise<void> {
    const originalPath = path.resolve(multerConfig.directory, filename);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) throw new Error("File not found!");

    const fileContent = await fs.promises.readFile(originalPath);

    this.client
      .putObject({
        Bucket: "e-sic",
        Key: filename,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalPath);
  }
}

export { AWSRepository };
