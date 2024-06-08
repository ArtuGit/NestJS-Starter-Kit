export interface IAppConfig {
  workingDirectory: string
}

export const appConfig: IAppConfig = {
  workingDirectory: process.env.PWD || process.cwd(),
}
