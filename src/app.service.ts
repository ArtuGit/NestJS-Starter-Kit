import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const port = this.configService.get<number>('PORT')
    const commonVar = this.configService.get<string>('COMMON_VAR')
    return `<div>Hello World! (on port ${port}) <br> 
            COMMON_VAR="${commonVar}",</div>
            see <a href="/api">Swagger</a>`
  }
}
