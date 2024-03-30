const mongoose = require('mongoose')
const bcrypt = require('bcrypt') 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    isActive: {
        type: Boolean,
        default: 1
    }


})
userSchema.pre('save', function (next) {
    // console.log(this.password)
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})
module.exports = userSchema