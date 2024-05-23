import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ async: false })
class IsUUIDOrEmptyStringConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    if (value === '') {
      return true
    }
    return (
      typeof value === 'string' &&
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value)
    )
  }
}

export function IsUUIDOrEmptyString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: 'The $property should be a valid UUID or an empty string',
        ...validationOptions,
      },
      constraints: [],
      validator: IsUUIDOrEmptyStringConstraint,
    })
  }
}
