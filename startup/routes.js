const express = require('express')
const path = require('path')
const bodyParser = require("body-parser")
const error = require('../middleware/error')
const users = require('../routes/users')
const giveaways = require('../routes/giveaways')
const profiles = require('../routes/profiles')
const auth = require('../routes/auth')

module.exports = function(app){

    app.use(bodyParser.json());
    app.use('/images', express.static(path.join(__dirname, 'images')));

    app.use('/api',auth)
    app.use('/api',users)
    app.use('/api',giveaways)
    app.use('/api',profiles)
    app.use(error)  
}