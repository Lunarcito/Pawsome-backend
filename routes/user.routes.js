const mongoose = require('mongoose')
const express = require('express')
const router = express.Router();
const User = require("../models/User.model")
<<<<<<< HEAD
const fileUploader = require('../config/cloudinary.config');
const {isAuthenticated} = require("../middleware/jwt.middleware")


router.get("/user-profile/:userId", async (req, res) => {
    const { userId } = req.params
    
    try {
        const userProfile = await User.findById(userId)
        res.json(userProfile)
    } catch (error) {
        res.json("no users")
    }
})

router.post("/user-profile/edit-photo", fileUploader.single('image'), isAuthenticated, async (req, res) => {
    const user = req.payload

     try{
         const newPhoto = await User.findByIdAndUpdate(user._id, {image: req.file.path})
         res.json(newPhoto)
     }catch (err){
         res.json(err)
     }
   })
=======
const Place = require("../models/Place.model");
const { isAuthenticated } = require('../middleware/jwt.middleware')



router.get("/profile", isAuthenticated, async (req, res, next) => {
    const currentUser = req.payload
    try{
        const thisUser = await User.findById(currentUser._id)
        res.json(thisUser._id);
    } catch(err){
        console.log(err)
    }
})
router.get ("/profile/my-places", isAuthenticated, async (req, res, next) => {
    const currentUser = req.payload
    try{
        const place = await Place.find({user: currentUser}).populate("place")
        console.log(place)
        res.json(place);
    } catch(err){
        console.log(err)
    }
})
>>>>>>> ab6823aaec5e5ee8b7af5061c7ef19248155343b

module.exports = router