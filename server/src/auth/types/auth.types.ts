export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    username: string;
    email: string | null;
    avatarUrl: string | null;
  };
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  email: string | null;
}

export interface UserProfileResponse {
  id: string;
  steamId: string | null;
  username: string;
  email: string;
  avatarUrl: string | null;
}
