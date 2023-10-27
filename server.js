import express from "express";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js"
import itemFlightRoutes from "./routes/itemFlightRoutes.js"
import itemHotelRoutes from "./routes/itemHotelRoutes.js"
import connectDB from "./connections/db.js"
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
dotenv.config();

// PORT
const PORT = process.env.PORT || 5000 || 6000 || 7000;

// Establish the MongoDB connection
connectDB();

// Middleware to parse JSON request bodies
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// Use the product routes
app.use("/items/flight", itemFlightRoutes);
app.use("/items/hotel", itemHotelRoutes);
app.use("/users", userRoutes);

//rest api
app.get("/", (req, resp) => {
    resp.send({
        message: "welcome to express",
    });
}); // root page like www.youtube.com is the rootpage of youtube


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, "./myapp/src")));

app.get("/home", (req, resp) => {
    resp.sendFile(path.join(__dirname, "./myapp/src", "index.js"));
});

app.get("/about", (req, resp) => {
    resp.send({
        message: "welcome to about page",
    })
})

app.get("/contact", (req, resp) => {
    resp.send({
        message: "welcome to contact page",
    })
})


// Start the Express Server
app.listen(PORT, () => {
    console.log(`Server is Running on ${process.env.DEV_MODE} mode on ${PORT}`.bgCyan.white);
});
