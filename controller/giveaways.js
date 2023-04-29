const {Giveaway,validate} = require('../models/giveaway')

const addGiveaway = async (req,res,next) => {
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    try{
        giveaway = new Giveaway({
            item: req.body.item,
            owner: req.body.owner,
            image: req.file.path,
            category: req.body.category,
            description: req.body.description,
            location: req.body.location,
            available:req.body.available,
            pickup: req.body.pickup, 
            courier: req.body.courier 
        })
        await giveaway.save()
        console.log( giveaway) 
        res.send({
            _id: giveaway._id,
            item: giveaway.item, 
            owner: giveaway.owner,
            image: giveaway.path,
            category: giveaway.category,
            description: giveaway.description, 
            location: giveaway.location,
            available: giveaway.available,
            pickup: giveaway.pickup,
            courier: giveaway.courier
        })
    }catch(error) {
        res.status(400).send("Invalid data provided.",error);
    }
}

const getGiveaways = async (req,res,next) => {
    try{
        const giveaway = await Giveaway
        .find({}, {__v:0 })
        // .populate('edited_by','username ,_id')
        .sort('-createdAt');
        res.send(giveaway)
    }catch(ex){
        next(ex)
    }
}

const getGiveaway = async (req,res,next) => {
    try{
        const giveaway = await Giveaway
        .findById(req.params.id, { __v:0 })
        if(!giveaway) return res.status(404).send('The giveaway with the given ID was not found');
        res.send(giveaway)
    }catch(ex){
        next(ex)
    }
}

const updateGiveaway = async (req,res,next) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    try{
        const giveaway = await Giveaway.findByIdAndUpdate(req.params.id,
            {
                item: req.body.item,
                owner: req.body.owner,
                image: req.file.path,
                category: req.body.category,
                description: req.body.description,
                location: req.body.location,
                available: req.body.available,
                pickup: req.body.pickup,
                courier: req.body.courier
            }
            ,{new: true});
        
          if (!giveaway) return res.status(404).send('The giveaway with the given ID was not found.');
        
          res.send(giveaway);
    }catch(ex){
        next(ex)
    }
}

const deleteGiveaway = async (req,res,next) => {
    try{
        const giveaway = await Giveaway.findByIdAndRemove(req.params.id);
        if(!giveaway) return res.status(404).send('The giveaway with the given ID was not found');
        res.send(giveaway)
    }catch(ex){
        next(ex)
    }
}

module.exports = {
    addGiveaway,
    getGiveaways,
    getGiveaway,
    updateGiveaway,
    deleteGiveaway
};