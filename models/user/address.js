const jwt = require('jsonwebtoken')
const Joi = require('joi')
const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
  default: { type: Boolean },
  name: { type: String, trim: true },
  type: { type: String, trim: true },
  country: { type: String, trim: true },
  city: { type: String, trim: true },
  area: { type: String, trim: true },
  street: { type: String, trim: true },
  building: { type: String, trim: true },
  floor: { type: String, trim: true },
  apartment: { type: String, trim: true },
  mobile: { type: String, trim: true },
  lat: { type: Number, require: false , default: null},
  long: { type: Number, require: false , default: null},
  landmark: { type: String, trim: true },
  shipping_note: { type: String, trim: true },
})

const Address = mongoose.model('Address', addressSchema)

function validateAddress(address) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    default: Joi.boolean().required(),
    type: Joi.string().min(5).max(50).required(),
    country: Joi.string().min(5).max(50).required(),
    city: Joi.string().min(5).max(255).required(),
    area: Joi.string().min(5).max(255).required(),
    street: Joi.string().min(5).max(255).required(),
    building: Joi.string().min(5).max(50).required(),
    floor: Joi.string().min(5).max(50).required(),
    apartment: Joi.string().min(5).max(50).required(),
    mobile: Joi.string().min(5).max(50).required(),
    lat: Joi.number(),
    long: Joi.number(),
    landmark: Joi.string().min(5).max(50).required(),
    shipping_note: Joi.string().min(5).max(255).required()
  }

  return Joi.validate(address, schema)
}

exports.Address = Address 
exports.addressSchema = addressSchema
exports.validate = validateAddress