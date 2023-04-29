const {Profile,validate} = require('../models/profile')

const getProfile = async (req,res,next) => {
    try{
        const profile = await Profile.findById(req.params.id, {password: 0,createdAt: 0,__v:0 })
        if(!profile) return res.status(404).send('The user with the given ID was not found');
        res.send(profile)
    }catch(ex){
        next(ex)
    }
}

const updateProfile = async (req,res,next) => {
    const {error} = validate(req.body);
    if(error ) {return res.status(404).send(error.details[0].message)}; 
    try{
        const profile = await Profile.findOneAndUpdate(req.params.id,
            {
                name: req.body.name,
                profile: req.file.path, 
                location: req.body.location
            }
            ,{new: true});
        
          if (!profile) return res.status(404).send('The user with the given ID was not found.');
        
          console.log(profile)
          res.send(profile);
    }catch(ex){
        next(ex)
    }
}

const deleteProfile = async (req,res,next) => {
    try{
        const profile = await Profile.findByIdAndRemove(req.params.id);
        if(!profile) return res.status(404).send('The user with the given ID was not found');
        res.send(profile)
    }catch(ex){
        next(ex)
    }
}

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile
};