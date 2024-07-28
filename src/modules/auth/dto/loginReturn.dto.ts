export class LoginReturnDTO {
  /**
   * Access token for authentication
   */
  accessToken: string

  /**
   * Refresh token for obtaining new access tokens
   */
  refreshToken: string
}
