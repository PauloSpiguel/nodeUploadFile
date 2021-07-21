interface IFilesRepositories {
  list(): Promise<any>;
  uploadFrom(path: string): Promise<any>;
}

export { IFilesRepositories };
