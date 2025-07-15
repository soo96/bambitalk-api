export const FILE_UPLOAD_SERVICE = Symbol('FILE_UPLOAD_SERVICE');

export interface FileUploadService {
  uploadFile(file: string): Promise<string>;
}
