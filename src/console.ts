import { BootstrapConsole } from 'nestjs-console'
import { CliModule } from './modules/cli/cli.module'

const bootstrap = new BootstrapConsole({
  module: CliModule,
  useDecorators: true,
})
bootstrap.init().then(async (app) => {
  try {
    await app.init()
    await bootstrap.boot()
    await app.close()
  } catch (e) {
    console.error(e)
    await app.close()
    process.exit(1)
  }
})
