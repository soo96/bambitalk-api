export const RequestErrorCode = {
  MISSING_REQUIRED_FIELD: '1400',
  INVALID_QUERY_STRING: '1401',
  UNAUTHORIZED: '2400',
  INVALID_PROVIDER: '2401',
  INVALID_NICKNAME_LENGTH: '3400',
  INVALID_USER_ROLE: '3404',
  INVALID_DATE: '4400',
  INVALID_COLOR: '4401',
  INVALID_IS_COMPLETED: '4402',
  INVALID_SCHEDULE_ID_TYPE: '4403',
  INVALID_LIMIT_RANGE: '6400',
} as const;

export type RequestErrorCode = (typeof RequestErrorCode)[keyof typeof RequestErrorCode];

export const RequestErrorMessage: Record<RequestErrorCode, string> = {
  [RequestErrorCode.MISSING_REQUIRED_FIELD]: '필수 필드가 누락되었습니다.',
  [RequestErrorCode.INVALID_QUERY_STRING]: 'query string 값이 올바르지 않습니다.',
  [RequestErrorCode.UNAUTHORIZED]: '인증에 실패하였습니다.',
  [RequestErrorCode.INVALID_PROVIDER]: '소셜 제공자가 유효하지 않습니다.',
  [RequestErrorCode.INVALID_NICKNAME_LENGTH]: '닉네임은 2-10자 사이여야 합니다.',
  [RequestErrorCode.INVALID_USER_ROLE]: '역할은 DAD, MOM 중 하나여야 합니다.',
  [RequestErrorCode.INVALID_DATE]: '날짜 형식이 유효하지 않습니다.',
  [RequestErrorCode.INVALID_COLOR]:
    '색상은 RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE 중 하나여야 합니다.',
  [RequestErrorCode.INVALID_IS_COMPLETED]: 'isCompleted는 true 또는 false여야 합니다.',
  [RequestErrorCode.INVALID_SCHEDULE_ID_TYPE]: 'scheduleId는 숫자여야 합니다.',
  [RequestErrorCode.INVALID_LIMIT_RANGE]: 'limit은 최소 1, 최대 50까지만 설정할 수 있습니다.',
};
