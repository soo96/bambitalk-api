export const RequestErrorCode = {
  MISSING_REQUIRED_FIELD: '1400',
  INVALID_QUERY_STRING: '1401',
  UNAUTHORIZED: '2400',
  INVALID_PROVIDER: '2401',
  INVALID_NICKNAME_LENGTH: '3400',
  INVALID_USER_ROLE: '3404',
} as const;

export type RequestErrorCode = (typeof RequestErrorCode)[keyof typeof RequestErrorCode];

export const RequestErrorMessage: Record<RequestErrorCode, string> = {
  [RequestErrorCode.MISSING_REQUIRED_FIELD]: '필수 필드가 누락되었습니다.',
  [RequestErrorCode.INVALID_QUERY_STRING]: 'query string 값이 올바르지 않습니다.',
  [RequestErrorCode.UNAUTHORIZED]: '인증에 실패하였습니다.',
  [RequestErrorCode.INVALID_PROVIDER]: '소셜 제공자가 유효하지 않습니다.',
  [RequestErrorCode.INVALID_NICKNAME_LENGTH]: '닉네임은 2-10자 사이여야 합니다.',
  [RequestErrorCode.INVALID_USER_ROLE]: '역할은 DAD, MOM 중 하나여야 합니다.',
};
