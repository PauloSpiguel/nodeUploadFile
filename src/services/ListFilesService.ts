import { IFilesRepositories } from "../repositories/IFilesRepositories";

class ListFilesService {
  constructor(private filesRepository: IFilesRepositories) {}

  async execute(directory: string): Promise<void> {
    return await this.filesRepository.list(directory);
  }
}

export { ListFilesService };
