import { IFilesRepositories } from "../repositories/IFilesRepositories";

class UploadFilesService {
  constructor(private filesRepository: IFilesRepositories) {}

  async execute({
    file,
    params,
  }: {
    file: Express.Multer.File;
    params?: any;
  }): Promise<void> {
    await this.filesRepository.saveFile({
      filename: file.filename,
      params,
    });
  }
}

export { UploadFilesService };
