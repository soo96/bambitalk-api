import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FieldConstraintErrorMap } from './interfaces/common/dto/field-error-map';
import { RequestErrorCode } from './interfaces/common/errors/request-error-code';
import { RequestCustomException } from './interfaces/common/errors/request-custom-exception';
import { HttpExceptionFilter } from './interfaces/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // POJO 객체를 DTO 클래스로 자동 변환
      transform: true,
      // Request Params 검증할 떄 에러메시지 직접 핸들링
      exceptionFactory: (errors) => {
        const firstError = errors[0];
        const field = firstError.property;
        const constraints = firstError.constraints ?? {};

        // constraints key들 중 첫 번째를 기준으로 메시지 추출
        const constraintKey = Object.keys(constraints)[0];
        const code =
          FieldConstraintErrorMap[field]?.[constraintKey] ?? RequestErrorCode.INVALID_QUERY_STRING;

        return new RequestCustomException(code);
      },
    })
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
