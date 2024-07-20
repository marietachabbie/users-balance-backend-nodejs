const Joi = require('@hapi/joi');

class ValidationError extends Error {
  constructor(message, fieldName) {
    super(message)
    this.fieldName = fieldName
  }
}

module.exports = {
  requestSchema: Joi.object({
    params: Joi.object({
      id: Joi.string().regex(/^\d+$/).required()
      .error(() => new ValidationError("User ID must be numeric and positive", "userId")),
    }),

    body: Joi.object({
      balance: Joi.string().regex(/^-?\d*\d+$/).required()
        .error(() => new ValidationError("Balance must be numeric", "balance")),
    })
  }).unknown(true),
}
