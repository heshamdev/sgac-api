const config = require('../../config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash')
const { addressSchema } = require('./address')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  roles: {
    type: Array,
    required: true,
    default: ['client']
  },
  gender: {
    type: String,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: String,
    minlength: 5,
    maxlength: 50
  },
  is_verified: {
    type: Object,
    required: true,
    default: { email: false, verified: false },
  },
  points: {
    type: Number,
    default: 0,
  },
  addresses: {
    type: [addressSchema],
    required: false,
    default: []
  },
  wishlist: {
    type: Array,
    default: [],
    required: false
  }
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt
  .sign( _.pick(this, ['_id', 'roles', 'email', 'is_verified']), config.jwtPrivateKey);
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    roles: Joi.array().min(1),
    phone: Joi.string().min(5).max(20).required(),
    gender: Joi.string().min(3).max(50).required(),
    points: Joi.number().min(0),
    wishlist: Joi.array()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;