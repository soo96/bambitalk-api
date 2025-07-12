export const API_PREFIX = 'api/v1';

export const OAUTH_URL = {
  USER_INFO: {
    KAKAO: 'https://kapi.kakao.com/v2/user/me',
  },
};

export const JWT_CONFIG = {
  ACCESS: {
    EXPIRES_IN: '1h',
  },
  REFRESH: {
    EXPIRES_IN: '7d',
  },
};

export const CACHE = {
  INVITE_CODE_TTL: 60 * 15, // 15분
};
