const isValidationError = (value:any) => typeof value?.property !== 'undefined' && typeof value?.reason !== 'undefined'

/* CURRIED VALIDATORS */
export const inNumberArray = (allowedNumbers:any) => (property:any, value:any) => {
  if (typeof value === 'undefined') return

  if (typeof value !== 'number' || isNaN(value)) {
    return {
      property,
      reason: `Value ${value} not allowed, must be of type number`
    }
  }

  if (!allowedNumbers.includes(value)) {
    return {
      property,
      reason: `Value is not valid. Got ${value}, expected ${allowedNumbers}`
    }
  }
}

export const isBetween = (min:any, max:any) => (property:any, value:any) => {
  if (typeof value === 'undefined') return

  if (typeof value !== 'number' || isNaN(value)) {
    return {
      property,
      reason: `Value ${value} not allowed, must be of type number`
    }
  }

  if (value < min || value > max) {
    return {
      property,
      reason: `Value must in between ${min} and ${max}`
    }
  }
}

export const isRequiredAllOrNone = (requiredKeys:any) => (body:any) => {
  const presentKeys = Object.keys(body).filter((x) => typeof body[x] !== 'undefined')
  const isValid =
    requiredKeys.every((x:any) => presentKeys.includes(x)) || requiredKeys.every((x:any) => !presentKeys.includes(x))

  if (!isValid) {
    return {
      property: '$schema',
      reason: `If one of the following properties is present, all or none must be present: ${requiredKeys.join(', ')}`
    }
  }
}

/* VALIDATION RUNNER */
export const validateRequest = (body:any, propertyValidator:any, schemaValidator:any) => {
  const schemaValidations = schemaValidator.map((validator:any) => validator?.(body))
  const propValidations = Object.keys(propertyValidator).flatMap((property) => {
    const value = body?.[property]
    const func = propertyValidator[property]
    const validations = Array.isArray(func) ? func.map((f) => f(property, value)) : func?.(property, value)
    return Array.isArray(validations) ? validations : [validations]
  })
  return schemaValidations.concat(propValidations).filter(isValidationError)
}
