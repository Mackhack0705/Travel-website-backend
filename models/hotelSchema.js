import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    id: Number,
    hotelName: String,
    hotelImageLink: String,
    hotelDestination: String,
    hotelRatings: Number,
    CheckInDate: String,
    CheckOutDate: String,
    roomPrice: Number,
});

const hotels = mongoose.model("hotels", productSchema);

export default hotels;