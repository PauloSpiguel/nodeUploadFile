import { IFilesRepositories } from "../repositories/IFilesRepositories";

class ListFilesService {
  constructor(private filesRepository: IFilesRepositories) {}

  async list(): Promise<any> {
    return await this.filesRepository.list();
  }
}

export { ListFilesService };
