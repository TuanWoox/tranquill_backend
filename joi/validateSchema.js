const Joi = require("joi");

module.exports.signUpSchema = Joi.object({
  fullName: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  dateOfBirth: Joi.date()
    .less(new Date(new Date().setFullYear(new Date().getFullYear() - 18))) // Must be at least 18 years old
    .required()
    .messages({
      "date.less": "You must be at least 18 years old",
    }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .required(),
  nationalId: Joi.string()
    .pattern(/^[0-9]{9,12}$/)
    .required(),
});

module.exports.updateUserSchema = Joi.object({
  fullName: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  dateOfBirth: Joi.date()
    .less(new Date(new Date().setFullYear(new Date().getFullYear() - 18)))
    .messages({
      "date.less": "You must be at least 18 years old",
    }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,11}$/)
    .messages({
      "string.pattern.base": "Phone number must be 10 or 11 digits",
    }),
  nationalId: Joi.string()
    .pattern(/^[0-9]{9,12}$/)
    .messages({
      "string.pattern.base": "National ID must be 9 to 12 digits",
    }),
}).min(1); // Ensure at least one field is provided

module.exports.updateBookingSchema = Joi.object({
  bookingId: Joi.string().required(),
  numGuests: Joi.number().integer().min(1).required(),
  hasBreakfast: Joi.boolean().optional(),
  observations: Joi.string().allow("", null).optional(),
  extrasPrice: Joi.number().integer().min(0).optional(),
});
