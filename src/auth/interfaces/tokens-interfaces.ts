export interface IRefreshToken {
  id: string
  userId: string
  isRevoked: boolean
  expires: Date
}

export type IRefreshTokenPatchPayload = Partial<Omit<IRefreshToken, 'id'>>

export interface RefreshTokenPayload {
  refreshTokenId: string
  jti: string
  sub: string
}

export interface RefreshTokenResult {
  id: string
  token: string
}
