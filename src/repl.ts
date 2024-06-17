import { repl } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap() {
  const replServer = await repl(AppModule)
  replServer.setupHistory('.nestjs_repl_history', (err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  })
}
bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
})
