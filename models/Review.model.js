const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
    {
        check: {
            type: Boolean,
            required: true,
        },
        comment: {
            type: String,
            trim: true
        },
        place: {
            type: Schema.Types.ObjectId, ref: "Place"
        },
        user: {
            type: Schema.Types.ObjectId, ref: "User"
        }
    },
    {
        timestamps: true,
    }
)
const Review = model("Review", reviewSchema);
module.exports = Review;