const mongoose = require('mongoose')
const {User} = require('./user')
const Joi = require('joi')

const profileSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    name:{
        type: String,
        minlength:3,
        maxlength: 50,
    }, 
    profile: {
        type: String,
    },
    location:{
        type: String,
        minlength:3,
        maxlength: 50,
    }
},{timestamps: true})

const Profile = mongoose.model('Profile', profileSchema)

function validateProfile(profile){
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        name : Joi.string().min(3).max(50).required(),
        profile : Joi.string(),
        location : Joi.string().min(3).max(50).required(),
    })
    return schema.validate(profile);
}

exports.Profile = Profile;
exports.validate = validateProfile;