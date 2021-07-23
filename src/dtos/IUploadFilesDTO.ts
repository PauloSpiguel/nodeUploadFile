type Params = {
  directory: string;
  customFilename: string;
};

interface IUploadFilesDTO {
  filename: string;
  params: Params;
}

export { IUploadFilesDTO };
