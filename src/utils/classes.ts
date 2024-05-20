import { ApiProperty } from '@nestjs/swagger'

export class ReturnMessage {
  @ApiProperty({ default: 'Ok' })
  message: string
}

export class AvailablePhones {
  @ApiProperty({ description: 'Returns count of available phones.' })
  availablePhones: number
}

export class HasDefaultPaymentMethod {
  @ApiProperty({
    description: 'Returns if customer has default payment method.',
  })
  hasDefaultPaymentMethod: boolean
}

export class ReturnApiAccessKey {
  @ApiProperty()
  accessKey: string
}

export class PhoneCache {
  @ApiProperty()
  number: string

  inUse: boolean
}
