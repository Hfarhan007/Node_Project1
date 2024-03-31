const express = require('express')
const router = express.Router()
const joi = require('joi')
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt")


//validaters
const addUserValidator = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(8)
})

const loginUserValidator = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(8)
})


//Models
const User = require('../models/User')

const jsonParser = bodyParser.json()

router.post("/add", jsonParser, async (req, res) => {

    try {

        await addUserValidator.validateAsync(req.body)

        const checkEmail = await User.findOne({ email: req.body.email })
        if (checkEmail) {
            res.send({ status: false, message: "User already exists" })
        } else {
            // const password = req.body.password
            // req.body.password = await bcrypt.hashSync(password, saltRounds)
            const user = new User(req.body)
            await user.save()
            res.send({ status: true, message: "User saved successfully" })
        }
    } catch (error) {
        console.log(error)
        res.send({ status: false, message: error.details[0].message })
        // res.send({ status: false, message: "something went wrong" })
    }
    //OR
    // await bcrypt.hash(password, saltRounds).then(async (hash) => {
    //     req.body.password = hash
    //     const user = new User(req.body)
    //     await user.save()
    //     res.send('User added successfully')
    // }).catch((error) => {
    //     console.log(error)
    // })
})

// const user = new User(req.body)
// await user.save()

// user.save().then(() => {
//     res.json({ 'status': true, 'message': "user added successfully " })
// }).catch((error) => {
//     console.log(error)
//     res.json({ 'status': false, 'message': "somthing went wrong " })

// })

router.post('/login', jsonParser, async (req, res) => {
    try {
        await loginUserValidator.validateAsync(req.body)

        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const match = await bcrypt.compare(req.body.password, user.password)

            if (match) {
                res.send({ status: true, user: user, message: "Login Successfull..." })
            } else {
                res.send({ status: false, message: "Invalid Credentials!!" })
            }
        } else {
            res.send({ status: false, message: "Invalid Credentials!!" })
        }
    } catch (error) {
        console.log(error)
        res.send({ status: false, message: error.details[0].message })
    }
})
module.exports = router