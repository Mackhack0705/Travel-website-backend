import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    id: Number,
    airlineName: String,
    destination: String,
    departureDate: String,
    returnDate: String,
    ticketPrice: Number,
});

const flights = mongoose.model("flights", productSchema);

export default flights;