import { Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number | undefined> {
  transform(value: string): number | undefined {
    const parsedValue = parseInt(value, 10)

    if (isNaN(parsedValue)) {
      return undefined
    }

    return parsedValue
  }
}
