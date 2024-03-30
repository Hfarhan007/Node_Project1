const mongoose = require('mongoose')
const userschema = require('../schema/userschema')

const User=mongoose.model('users',userschema)



module.exports =User