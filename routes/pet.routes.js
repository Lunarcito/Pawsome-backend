const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const Pet = require("../models/Pet.model")
const User = require("../models/User.model")
const { isAuthenticated } = require('../middleware/jwt.middleware');

const fileUploader = require('../config/cloudinary.config');

router.post("/pet-profile/create", fileUploader.single('image'), isAuthenticated, async (req, res, next) => {
    const user = req.payload
    const { name, image } = req.body
    try {
        const petProfile = await Pet.create({ name, image: req.file.path, $push: { user: req.payload._id } })
        const userDb = await User.findByIdAndUpdate(req.payload._id, { $push: { pet: petProfile._id } });
        res.json(petProfile);
    } catch (error) {
        res.json(error)
    }
})


router.get("/pet-profile", isAuthenticated, async (req, res, next) => {
    try {
        const petsProfiles = await Pet.findById(req.payload.pet._id)
        res.json(petsProfiles);
    } catch (error) {
        res.json(error)
    }
})

router.put("/pet-profile/add-photo", fileUploader.single('image'), isAuthenticated, async (req, res) => {
    const user = req.payload
    const { name, image } = req.body
    try {
        const petImage = await Pet.findByIdAndUpdate(req.payload.pet._id, { image: req.file.path })
        res.json(petImage)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router