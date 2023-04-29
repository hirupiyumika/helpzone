const bcrypt = require('bcrypt')
const {User,validate} = require('../models/user')
const {Profile} = require('../models/profile')

const addUser = async (req,res,next) => {
    // console.log(req.body)
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered');

    try{
        user = new User({ 
            email: req.body.email,
            password: req.body.password 
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()
        profile = new Profile ({
            userId : user._id
        })
        // console.log(user)
        await profile.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token',token).send({ 
            id: user._id,
            email: user.email,
            token: token
        }); 
    }catch(ex){
        next(ex)
    }
}

const getUsers = async (req,res,  next) => {
    try{
        const users = await User.find({}, {password: 0,createdAt: 0,__v:0 }).sort('-createdAt');
        res.send(users)
    }catch(ex){
        next(ex)
    }
}

const getUser = async (req,res,auth,next) => {
    try{
        const user = await User.findById(req.params.id, {password: 0,createdAt: 0,__v:0 })
        if(!user) return res.status(404).send('The user with the given ID was not found');
        res.send(user)
    }catch(ex){
        next(ex)
    }
}

const deleteUser = async (req,res,next) => {
    try{
        const user = await User.findByIdAndRemove(req.params.id);
        if(!user) return res.status(404).send('The user with the given ID was not found');
        res.send(user)
    }catch(ex){
        next(ex)
    }
}

module.exports = {
    addUser,
    getUsers,
    getUser,
    deleteUser
};