const express = require("express");
const router = express.Router();
const fileUploader = require('../config/cloudinary.config');
const User = require("../models/User.model")
const Place = require("../models/Place.model")
const Review = require("../models/Review.model")
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { json } = require("express");
const Favorite = require("../models/Favorite");

router.post("/addPlace", isAuthenticated, fileUploader.array('pictures'), async (req, res) => {
    const { name, address, description, type, socialMedia, typeOther } = req.body;
    const pictures = []
    if (req.file) {
        pictures.push(req.file.path)
    } else if (req.files) {
        req.files.forEach((file) => {
            pictures.push(file.path)
        })
    } else {
        if (type === 'Restaurant') {
            pictures.push('https://res.cloudinary.com/dfajfbnkr/image/upload/v1669826849/Pawsome/Restaurant-Logo-by-Koko-Store-580x386_ifffwk.jpg')
        } else if (type === 'Cafeteria') {
            pictures.push('https://res.cloudinary.com/dfajfbnkr/image/upload/v1669827075/Pawsome/20-18_mifloz.jpg')
        } else if (type === 'Museum') {
            pictures.push('https://res.cloudinary.com/dfajfbnkr/image/upload/v1669827649/Pawsome/publicmuseumsign_89226_djdz6i.png')
        } else if (type === 'Beach') {
            pictures.push('https://res.cloudinary.com/dfajfbnkr/image/upload/v1669829586/Pawsome/vecteezy_beach-icon-or-logo-isolated-sign-symbol-vector-illustration__mvmg5t.jpg')
        } else {
            pictures.push('https://res.cloudinary.com/dfajfbnkr/image/upload/v1669829890/Pawsome/pet_friendly_1_yivv9j.jpg')
        }

    }
    try {
        const newPlace = await Place.create({ name, address, description, pictures, type, socialMedia, User: req.payload._id, typeOthers: typeOther })
        const userUpdated = await User.findByIdAndUpdate(req.payload._id, { $push: { createdPlaceId: newPlace._id } })
        res.json(newPlace)
    } catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            res.status(500).json({ errorMessage: err.message, layout: false });
        } else if (err.code === 11000) {
            res.status(500).json({
                errorMessage:
                    "The name of the place and the address should be unique",
                layout: false
            });
        } else {
            next(err);
        }
    }
})

router.get("/places", async (req, res) => {
    try {
        const placeDB = await Place.find()
        res.json(placeDB)
    } catch (error) {
        res.json(error)
    }
})

router.get("/places/:placeId", async (req, res) => {
    const { placeId } = req.params
    try {
        const placeDB = await Place.findById(placeId).populate("User Review")
        res.json(placeDB)
    } catch (error) {
        res.json(error)
    }
})

router.put("/places/:placeId", fileUploader.array('pictures'), isAuthenticated, async (req, res) => {
    const placeId = req.params

    const { name, address, description, type, socialMedia, typeOther } = req.body;
    const pictures = []
    if (req.file) {
        pictures.push(req.file.path)
    } else if (req.files) {
        req.files.forEach((file) => {
            pictures.push(file.path)
        })
    }
    try {
        const placeUpdatedDB = await Place.findByIdAndUpdate(placeId.placeId, { $set: { name: name, address, description, pictures, type, socialMedia, User: req.payload._id, typeOthers: typeOther } })
        res.json(placeUpdatedDB)
    } catch (error) {
        res.json(error)
    }
})
//% VAlidacion:
router.get("/places/:placeId/reviews", isAuthenticated, async (req, res) => {
    const { placeId } = req.params
    try {
        console.log("searching reviews of places ID", placeId)
        const reviewsByPlace = await Review.find({ place: placeId })
        res.json(reviewsByPlace)

    } catch (error) {
        res.json(error)
    }
})

router.delete("/places/:placeId", isAuthenticated, async (req, res) => {
    const { placeId } = req.params
    try {
        const userDel = await User.findByIdAndUpdate(req.payload._id, { $pull: { createdPlaceId: placeId } })
        const placeDeleted = await Place.findByIdAndDelete(placeId)
        const ressponse = {
            userDel: userDel,
            placeDeleted: placeDeleted
        }
        res.json(ressponse)
    } catch (error) {
        res.json(error)
    }
})

router.get("/map", isAuthenticated, async (req, res) => {
    try {
        const spotsDb = await Place.find()
        const mapCenter = [-3.703339, 40.416729]
        const mapZoom = 5
        res.json("map", { layout: false, user: req.payload, spotsDb, mapCenter, mapZoom });
    } catch (err) {
        console.log(err)
    }
});

router.get("/addReview/:placeId", isAuthenticated, (req, res) => {
    res.json(req.params.placeId)
});

router.post("/addReview/:placeId", isAuthenticated, async (req, res) => {
    try {
        const userSaved = await User.findById(req.payload._id)
        const placeSaved = await Place.findById(req.params.placeId)
        const reviewFind = await Review.find({ user: req.payload._id, place: req.params.placeId })
        let review = {}
        if (!reviewFind) {
            return
        }

        if (req.body.comment) {
            review = {
                check: req.body.check,
                comment: req.body.comment,
                place: placeSaved,
                user: userSaved
            }
        } else {
            review = {
                check: req.body.check,
                place: placeSaved,
                user: userSaved
            }
        }

        const newReview = await Review.create(review)
        await Place.findByIdAndUpdate(req.params.placeId, { $push: { Review: newReview._id } });
        await User.findByIdAndUpdate(req.payload._id, { $push: { reviewId: newReview._id } });
        res.json(newReview)
    } catch (err) {
        console.log(err)
    }
})

router.post("/favorite/:placeId", isAuthenticated, async (req, res) => {
    const place = req.params
    const placeId = place.placeId
    const user = req.payload
    try {
        let favoritesDB = await Favorite.find({ place: placeId, user: user._id })
        if (favoritesDB) {
            const deletedFavorite = await Favorite.findOneAndDelete({ place: placeId, user: user._id })
            console.log("DELETED FAVORITE", deletedFavorite)
        }
        let newFavorite = await Favorite.create({ user: user._id, place: placeId })
        console.log("TIS IS NEW FAVORITE", newFavorite)
        isAuthenticated
        res.json(newFavorite)
    } catch (error) {
        console.log(error)
    }
}),

    module.exports = router;