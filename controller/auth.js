const config = require('config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const {User} = require('../models/user')

const login = async (req,res,next) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password');
    try{
        const token = jwt.sign({_id: user._id},config.get('jwtPrivateKey'))
                res.send({
                    token: token,
                    id: user._id,
                    email:user.email,  
                }); 
    }catch(ex){
        next(ex)
    }
}

function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(1024).required().email(),
        password: Joi.string().min(3).max(1024).required()      
    })
    return schema.validate(req);
}

module.exports = {
    login
};