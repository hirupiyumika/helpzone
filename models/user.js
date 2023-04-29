const config = require('config')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Joi = require('joi')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        minlength:5,
        maxlength: 50,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength:3,
        maxlength: 1024
    },
},{timestamps: true})

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id},config.get('jwtPrivateKey'), { expiresIn: 60 * 2 })
    return token;
}

const User = mongoose.model('User', userSchema)

function validateUser(user){
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required().email(),
        password: Joi.string().min(3).max(1024).required(),
    })
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;