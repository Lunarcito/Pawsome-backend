const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const Pet = require("../models/Pet.model")
const User = require("../models/User.model")
const { isAuthenticated } = require('../middleware/jwt.middleware');

const fileUploader = require('../config/cloudinary.config');


router.post("/pet-profile/create", fileUploader.single('image'), isAuthenticated, async (req, res) => {
    const { namePet } = req.body
    const {user} = req.payload._id

    try {
        console.log("uploading pet picture")
        console.log(req.file.path)
        const petProfile = await Pet.create({ namePet, image: req.file.path, user: req.payload._id })
        const userUpdated = await User.findByIdAndUpdate(req.payload._id, {$push: { pet: petProfile._id },
        });

        res.json(petProfile)

    } catch (error) {
       console.log(error) 
       res.json("problem")
    }
})


router.get("/pet-profile", isAuthenticated, async (req, res, next) => {
    try {
        const petsProfiles = await Pet.find({user: req.payload._id})
        res.json(petsProfiles);
    } catch (error) {
        res.json(error)
    }
})

router.put("/pet-profile/add-photo", fileUploader.single('image'), isAuthenticated, async (req, res) => {
    try {
        const petImage = await Pet.findByIdAndUpdate({user: req.payload._id}, { image: req.file.path })
        res.json(petImage)
    } catch (error) {
        console.log(error)
    }
})
router.delete("/pet-profile/:petId", isAuthenticated, async (req, res) => {
    const { petId } = req.params
    try{
        const userDel = await User.findByIdAndUpdate(req.payload._id, {$pull: { pet: petId }
        });
        const petDb = await Pet.findByIdAndDelete(petId)
        const ressponse = {
            userDel: userDel,
            petDb: petDb,
        }
        res.json(ressponse)
    }   
    catch (err) {
        res.json(err)
    }
})


module.exports = router