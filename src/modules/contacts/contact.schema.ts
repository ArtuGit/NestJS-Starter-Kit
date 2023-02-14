import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { HydratedDocument } from 'mongoose'

export type ContactDocument = HydratedDocument<Contact>

@Schema()
export class Contact {
  @Prop()
  @ApiProperty({ type: String })
  firstName: string

  @Prop()
  @ApiProperty({ type: String })
  lastName: string

  @Prop()
  @ApiProperty({ type: String })
  title: string

  @Prop()
  birthdate
}

export const ContactSchema = SchemaFactory.createForClass(Contact)
