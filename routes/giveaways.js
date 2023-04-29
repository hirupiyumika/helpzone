const express = require('express');
const router = express.Router(); 
const {upload} = require('../helpers/file-helper')
const { addGiveaway,getGiveaways,getGiveaway,updateGiveaway,deleteGiveaway } = require('../controller/giveaways')

router.get('/giveaway/:id', getGiveaway)
router.get('/giveaways', getGiveaways)
router.put('/giveaway/:id', upload.single('image'), updateGiveaway)
router.post('/giveaway', upload.single('image'), addGiveaway) 
router.delete('/giveaway/:id', deleteGiveaway)

module.exports = router;