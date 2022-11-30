const crypto = require('crypto');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const User = require("../models/User.model")
const fileUploader = require('../config/cloudinary.config');
const { isAuthenticated } = require("../middleware/jwt.middleware")
const nodemailer = require('nodemailer')

require('dotenv').config()

const saltRounds = 10;

router.get("/user-profile/:userId", async (req, res) => {
    const { userId } = req.params

    try {
        const userProfile = await User.findById(userId).populate(
            "createdPlaceId pet"
        );
        res.json(userProfile)
    } catch (error) {
        res.json("no users")
    }
})

router.post("/user-profile/edit-photo", fileUploader.single('image'), isAuthenticated, async (req, res) => {

    const user = req.payload
    try {
        const newPhoto = await User.findByIdAndUpdate(user._id, { image: req.file.path })
        res.json(newPhoto)
    } catch (err) {
        res.json(err)
    }
})


router.get("/profile", isAuthenticated, async (req, res, next) => {
    const currentUser = req.payload
    try {
        const thisUser = await User.findById(currentUser._id).populate("createdPlaceId pet")
        res.json(thisUser);
    } catch (err) {
        console.log(err)
    }
})

router.post("/forgotPassword", isAuthenticated, async (req, res, next) => {
    if (req.body.email === '') {
        res.status(400).send('email required')
        return
    }

    User.findOne({ email: req.body.email })
        .then((foundUser) => {
            if (!foundUser) {
                // If the user is not found, send an error response
                res.status(401).json({ message: "Email not found." });
                return;
            } else {
                const token = crypto.randomBytes(20).toString('hex')
                foundUser.updateOne({ resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 })

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'g.milla.martin@gmail.com',
                        pass: 'dammzzdiwgofaatr'
                    }
                })

                const mailOptions = {
                    from: 'gemma.dummy.ironhack@gmail.com',
                    to: `${foundUser.email}`,
                    subject: 'Link to Reset Password',
                    text: `You are receiving this because you asked to reset your password. Plase click on the following link or paste this into your browser to complete the process. 
                    http://localhost:3000/setNewPassword
                    
                    After one hour the link will expire: http://localhost:8000/reset/${token} `
                }
                console.log(mailOptions.to)
                console.log("sending email")

                transporter.sendMail(mailOptions, (err, response) => {
                    if (err) {
                        console.log(err)
                        res.json({ message: "There was an error", err })
                    } else {
                        res.status(200).json("recovery email sent")
                        console.log(success)
                    }
                })
            }
        })
})

router.put("/setNewPassword", isAuthenticated, async (req, res, next) => {
    console.log(req.body)
    if (req.body.email === '') {
        res.status(400).send('email required')
        return
    }
    try {
        const foundUser = await User.findOne({ email: req.body.email })

        if (!foundUser) {
            // If the user is not found, send an error response
            res.status(401).json({ message: "Email not found." });
            return;
        } else {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);
            console.log(hashedPassword)
            const updatedUser = await User.findByIdAndUpdate(req.payload._id, { password: hashedPassword })
            res.json(updatedUser)
        }

    } catch (error) {
        console.log(error)
    }

})


module.exports = router