export const FILE_SERVICE = Symbol('FILE_SERVICE');

export interface FileService {
  uploadFile(file: Express.Multer.File): Promise<string>;
}
