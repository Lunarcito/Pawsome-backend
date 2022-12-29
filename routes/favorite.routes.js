const express = require('express');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const router = express.Router();
const Favorite = require("../models/Favorite");
const mongoose = require('mongoose')
const fileUploader = require('../config/cloudinary.config');


router.get("/favorites", isAuthenticated, async (req, res) => {
    const user = req.payload
    const userId = user._id
    try {
        const dbFavorites = await Favorite.find({ user: userId }).populate("place")
        res.json(dbFavorites)
    } catch (error) {
        console.log(error)
    }
})


router.delete('/favorites/:favoriteId', isAuthenticated,async (req, res) => {
    const favoriteId = req.params.favoriteId
    try {
        const dbFavorites = await Favorite.findOneAndDelete({ _id: favoriteId })
        res.json(dbFavorites)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router
