const ACCESS_COOKIE_NAME = "aa_access_token";
const REFRESH_COOKIE_NAME = "aa_refresh_token";
const DEFAULT_REFRESH_MAX_AGE_SEC = 60 * 60 * 24 * 30;

const buildCookie = (name: string, value: string, maxAgeSec: number) => {
  const securePart = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${name}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSec}${securePart}`;
};

export const createAuthCookieHeaders = (params: {
  accessToken: string;
  refreshToken: string;
  accessTokenMaxAgeSec?: number;
  refreshTokenMaxAgeSec?: number;
}) => {
  const headers = new Headers();
  const accessMaxAge = params.accessTokenMaxAgeSec ?? 60 * 60;
  const refreshMaxAge = params.refreshTokenMaxAgeSec ?? DEFAULT_REFRESH_MAX_AGE_SEC;

  headers.append("Set-Cookie", buildCookie(ACCESS_COOKIE_NAME, params.accessToken, accessMaxAge));
  headers.append("Set-Cookie", buildCookie(REFRESH_COOKIE_NAME, params.refreshToken, refreshMaxAge));

  return headers;
};

export const clearAuthCookieHeaders = () => {
  const headers = new Headers();
  headers.append("Set-Cookie", buildCookie(ACCESS_COOKIE_NAME, "", 0));
  headers.append("Set-Cookie", buildCookie(REFRESH_COOKIE_NAME, "", 0));
  return headers;
};

export const getAccessTokenFromCookieHeader = (cookieHeader: string | null): string | null => {
  return getTokenFromCookieHeader(cookieHeader, ACCESS_COOKIE_NAME);
};

export const getRefreshTokenFromCookieHeader = (cookieHeader: string | null): string | null => {
  return getTokenFromCookieHeader(cookieHeader, REFRESH_COOKIE_NAME);
};

const getTokenFromCookieHeader = (
  cookieHeader: string | null,
  cookieName: string,
): string | null => {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map((part) => part.trim());
  const target = parts.find((part) => part.startsWith(`${cookieName}=`));
  if (!target) return null;
  const raw = target.slice(`${cookieName}=`.length);
  if (!raw) return null;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};
