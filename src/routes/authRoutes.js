const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = mongoose.model('User')

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = new User({email, password})
        await user.save()

        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')

        res.send({token})    
    } catch (err) {
        return res.status(422).send(err.message)
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body

    if(!email || !password){
        return res.status(422).send({error: "add password or email"})
    }

    const user = await User.findOne({email})
    if(!user){
        return res.status(422).send({error: "email or password invalid"})
    }

    try{
        await user.comparePassword(password)
        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY')
        res.send({token});
    } catch(err) {
        return res.status(422).send({error: "email or password invalid"})
    }
})

module.exports = router;