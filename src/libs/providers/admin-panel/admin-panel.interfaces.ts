export interface CurrentAdmin {
  /**
   * Admin has one required field which is an email
   */
  email: string;
  /**
   * Optional title/role of an admin - this will be presented below the email
   */
  title?: string;
}