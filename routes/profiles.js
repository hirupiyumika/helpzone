const express = require('express');
const router = express.Router(); 
const {upload} = require('../helpers/file-helper')
const {getProfile,updateProfile,deleteProfile } = require('../controller/profiles')

router.get('/profile/:id', getProfile)
router.put('/profile/:id', upload.single('profile'), updateProfile)
router.delete('/profile/:id', deleteProfile)

module.exports = router;