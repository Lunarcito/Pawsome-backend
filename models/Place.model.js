const { Schema, model } = require("mongoose");

const placeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    pictures: {
        type: [String],
        required: false,
    },
    type: {
        type: String,
        required: true,
        enum: ['Beach', 'Restaurant', 'Museum', 'Cafeteria', 'Other']
    },
    typeOthers: {
        type: String,
        required: false,
    },
    socialMedia: {
        type: [String],
        required: false,
    },
    User: { type: Schema.Types.ObjectId, ref: 'User' },
    Review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    favorite: {
        type: Schema.Types.ObjectId, ref: "Favorite",
    },
}
);

const Place = model("Place", placeSchema);

module.exports = Place;

// const apiMap = "AIzaSyCkcywzbIz_vlwGJtBK8AmiesinG8aXAIU"
