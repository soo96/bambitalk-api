import { RequestErrorCode } from '../errors/request-error-code';

export const FieldConstraintErrorMap: Partial<
  Record<string, Partial<Record<string, RequestErrorCode>>>
> = {
  accessToken: {
    isNotEmpty: RequestErrorCode.INVALID_QUERY_STRING,
    isString: RequestErrorCode.INVALID_QUERY_STRING,
  },
  nickname: {
    isNotEmpty: RequestErrorCode.INVALID_QUERY_STRING,
    isString: RequestErrorCode.INVALID_QUERY_STRING,
    isLength: RequestErrorCode.INVALID_NICKNAME_LENGTH,
  },
  role: {
    isNotEmpty: RequestErrorCode.INVALID_QUERY_STRING,
    isIn: RequestErrorCode.INVALID_USER_ROLE,
  },
  kakaoId: {
    isNotEmpty: RequestErrorCode.INVALID_QUERY_STRING,
    isNumber: RequestErrorCode.INVALID_QUERY_STRING,
  },
};
