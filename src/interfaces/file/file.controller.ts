import { Controller, Inject, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FILE_SERVICE, FileService } from 'src/domain/common/file/file.service';
import { ResultResponseDto } from '../common/dto/result-response.dto';
import { RequestCustomException } from '../common/errors/request-custom-exception';
import { RequestErrorCode } from '../common/errors/request-error-code';

@Controller('files')
export class FileController {
  constructor(@Inject(FILE_SERVICE) private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new RequestCustomException(RequestErrorCode.FILE_IS_MISSING);
    }

    const fileUrl = await this.fileService.uploadFile(file);

    return ResultResponseDto.success({ fileUrl });
  }
}
