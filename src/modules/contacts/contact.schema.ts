import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { HydratedDocument } from 'mongoose'

export type ContactDocument = HydratedDocument<Contact>

@Schema()
export class Contact {
  @Prop({ type: String, required: true })
  @ApiProperty({ type: String })
  readonly firstName: string

  @Prop({ type: String, required: true })
  @ApiProperty({ type: String })
  readonly lastName: string

  @Prop({ type: String, required: false })
  @ApiProperty({ type: String })
  readonly title?: string

  @Prop({ type: Date, required: false })
  @ApiProperty({ type: Date })
  readonly birthdate?: Date
}

export const ContactSchema = SchemaFactory.createForClass(Contact)
