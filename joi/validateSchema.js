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

module.exports.bookingSchema = Joi.object({
  startDate: Joi.string().isoDate().required(),
  endDate: Joi.string().isoDate().required(),
  numGuests: Joi.number().integer().min(1).required(), // number
  cabinPrice: Joi.number().min(0).required(), // number
  extrasPrice: Joi.number().min(0).required(), // number
  hasBreakfast: Joi.boolean().required(), // boolean instead of string
  observations: Joi.string().allow("").optional(), // string (optional)
  cabin: Joi.string().required(), // still string (probably an ID)
}).custom((value, helpers) => {
  const start = new Date(value.startDate);
  const end = new Date(value.endDate);
  const now = new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return helpers.error("any.invalid", { message: "Invalid date format" });
  }

  if (start <= now) {
    return helpers.error("any.invalid", {
      message: "startDate must be in the future",
    });
  }

  if (start >= end) {
    return helpers.error("any.invalid", {
      message: "startDate must be before endDate",
    });
  }

  return value;
});

module.exports.updateBookingSchema = Joi.object({
  bookingId: Joi.string().required(),
  numGuests: Joi.number().integer().min(1).required(),
  hasBreakfast: Joi.boolean().optional(),
  observations: Joi.string().allow("", null).optional(),
  extrasPrice: Joi.number().integer().min(0).optional(),
});

module.exports.updateStatusBooking = Joi.object({
  bookingId: Joi.string().required(),
  status: Joi.string()
    .valid("confirmed", "checked-in", "checked-out")
    .required()
    .messages({
      "any.only":
        "Status must be one of: confirmed, checked-in, or checked-out",
      "any.required": "Status is required",
    }),
  isPaid: Joi.boolean().required(),
});
module.exports.updateSettingSchema = Joi.object({
  minBookingLength: Joi.number().integer().min(1).required(),
  maxBookingLength: Joi.number().integer().min(1).required(),
  maxNumberOfGuests: Joi.number().integer().min(1).required(),
  breakfastPrice: Joi.number().min(0).required(),
});

module.exports.rateSchema = Joi.object({
  bookingId: Joi.string().required(),
  cabinId: Joi.string().required(),
  rating: Joi.string().required(),
  comment: Joi.string().allow("").optional(),
});

module.exports.rateUpdateSchema = Joi.object({
  rating: Joi.string().optional(),
  comment: Joi.string().allow("").optional(),
});
