'use strict';
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("uploads call")
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const upload = multer({storage: storage
});

module.exports = {upload}