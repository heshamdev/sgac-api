// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User, validate} = require('../models/user')
// const mongoose = require('mongoose');

const post = async (req, res) => {
	const { error } = validate(req.body) 
	if (error) return res.status(400).send(error.details[0].message)

	let user = await User.findOne({ email: req.body.email })
	if (user) return res.status(400).send('User already registered.')

	user = new User(_.pick(req.body, ['name', 'email', 'password','phone','car','gender']))
	const salt = await bcrypt.genSalt(10)
	user.password = await bcrypt.hash(user.password, salt)
	await user.save()

	const token = user.generateAuthToken()
	res.header('x-auth-token', token).send({ token, ...(_.pick(user, ['_id', 'name', 'email']))})
}
 const getOne = async (req, res) => {
		// const { error } = validate(req.params)
		if (error) return res.status(400).send(error.details[0].message)

		const user = await User.findById(req.params.id)
		if (!user) {
			return res.status(404).send('User Not Found')
		}
		res.send(user)
	}
const getByEmail = async (req, res) => {
	if(!req.query || !req.query.email) {
		return res.status(400).send('No Email Provided.')
	}
	let user = await User.findOne({ email: req.query.email })
	if (user) return res.send(user)
	res.status(404).send('User Does Not Exist.')
}

const emailAvailable = async (req, res) => {
	if(!req.query || !req.query.email) {
		return res.status(400).send('No Email Provided.')
	}
	let user = await User.findOne({ email: req.query.email })
	if (user) return res.status(400).send('Email is not available.')
	return res.send('OK')
  
}

const me = async (req, res) => {
	const user = await User.findById(req.user._id).select('-password')
	res.send(user)
}



module.exports = {
	post,
	me,
	getOne,
	getByEmail,
	emailAvailable
}