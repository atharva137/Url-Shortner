// creating model for mogodb databse for creating url
const mongoose = require('mongoose');
const shortId = require('shortid')

const shortUrlSchema = mongoose.Schema({
    full:{
        type:"String",
        required:"true"
    },
    short:{
        type:"String",
         default: shortId.generate,
         required:"true",
    }
})

module.exports = mongoose.model('ShortUrl',shortUrlSchema);