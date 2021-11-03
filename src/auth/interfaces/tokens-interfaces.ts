export interface RefreshTokenPayload {
  refreshTokenId: string
  jti: string
  sub: string
}

export interface RefreshTokenResult {
  id: string
  token: string
}
