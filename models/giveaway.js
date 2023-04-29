const mongoose = require('mongoose')
const {User} = require('./user')
const Joi = require('joi')

const giveawaySchema = new mongoose.Schema({
    item:{
        type: String,
        required: true,        
        trim: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }, 
    image:{ 
        type: String,
    },
    category:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: true,
    },
    available: { 
        type: Boolean,
        required: true,
        default: true,
    },
    pickup: { 
        type: Boolean,
        required: true,
        default: false,
    },
    courier:{
        type: Boolean,
        required: true,
        default: false,
    }
},{timestamps: true})

const Giveaway = mongoose.model('Giveaway', giveawaySchema)

function validateGiveaway(giveaway){
    const schema = Joi.object({
        item : Joi.string().required(),
        owner: Joi.objectId().required(),
        image : Joi.string(),
        category : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        available : Joi.boolean().required(),
        pickup : Joi.boolean().required(),
        courier : Joi.boolean().required(),
    })
    return schema.validate(giveaway);
}

exports.Giveaway = Giveaway;
exports.validate = validateGiveaway;