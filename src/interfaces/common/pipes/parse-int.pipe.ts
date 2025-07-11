import { PipeTransform, Injectable } from '@nestjs/common';
import { RequestCustomException } from '../errors/request-custom-exception';
import { RequestErrorCode } from '../errors/request-error-code';

@Injectable()
export class ParseIntWithCodePipe implements PipeTransform {
  constructor(private readonly errorCode: RequestErrorCode) {}

  transform(value: string) {
    const parsed = parseInt(value, 10);

    if (isNaN(parsed)) {
      throw new RequestCustomException(this.errorCode);
    }

    return parsed;
  }
}
