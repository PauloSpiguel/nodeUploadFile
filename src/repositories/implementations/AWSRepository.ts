class AWSRepository implements IFilesRepositories {
  list(): Promise<any> {
    throw new Error("Method not implemented.");
  }
  uploadFrom(path: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}

export { AWSRepository };
