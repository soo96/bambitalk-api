import { RequestErrorCode } from '../errors/request-error-code';

export const FieldConstraintErrorMap: Partial<
  Record<string, Partial<Record<string, RequestErrorCode>>>
> = {
  accessToken: {
    isNotEmpty: RequestErrorCode.MISSING_REQUIRED_FIELD,
    isString: RequestErrorCode.INVALID_QUERY_STRING,
  },
  nickname: {
    isNotEmpty: RequestErrorCode.MISSING_REQUIRED_FIELD,
    isString: RequestErrorCode.INVALID_QUERY_STRING,
    isLength: RequestErrorCode.INVALID_NICKNAME_LENGTH,
  },
  role: {
    isNotEmpty: RequestErrorCode.MISSING_REQUIRED_FIELD,
    isIn: RequestErrorCode.INVALID_USER_ROLE,
  },
  kakaoId: {
    isNotEmpty: RequestErrorCode.MISSING_REQUIRED_FIELD,
    isNumber: RequestErrorCode.INVALID_QUERY_STRING,
  },
  cursor: {
    isNumber: RequestErrorCode.INVALID_QUERY_STRING,
  },
  limit: {
    isNumber: RequestErrorCode.INVALID_QUERY_STRING,
    min: RequestErrorCode.INVALID_LIMIT_RANGE,
    max: RequestErrorCode.INVALID_LIMIT_RANGE,
  },
  title: {
    isString: RequestErrorCode.INVALID_QUERY_STRING,
    isNotEmpty: RequestErrorCode.MISSING_REQUIRED_FIELD,
  },
  description: {
    isString: RequestErrorCode.INVALID_QUERY_STRING,
  },
  date: {
    isDate: RequestErrorCode.INVALID_DATE,
    isNotEmpty: RequestErrorCode.MISSING_REQUIRED_FIELD,
  },
  color: {
    isIn: RequestErrorCode.INVALID_COLOR,
  },
};
