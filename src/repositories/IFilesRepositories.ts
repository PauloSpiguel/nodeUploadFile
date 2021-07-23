import { IUploadFilesDTO } from "../dtos/IUploadFilesDTO";

interface IFilesRepositories {
  list(directory: string): Promise<any>;
  saveFile(payload: IUploadFilesDTO): Promise<void>;
}

export { IFilesRepositories };
