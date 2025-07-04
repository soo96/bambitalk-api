import { RequestErrorCode } from '../errors/request-error-code';

export const FieldConstraintErrorMap: Partial<
  Record<string, Partial<Record<string, RequestErrorCode>>>
> = {
  nickname: {
    isString: RequestErrorCode.INVALID_QUERY_STRING,
    isLength: RequestErrorCode.INVALID_NICKNAME_LENGTH,
  },
};
