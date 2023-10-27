import express from "express";
import flights from "../models/flightSchema.js"; // Import the 'flights' model

const router = express.Router();

// Define a route to handle adding a new item
router.post("/add", async (req, resp) => {
    try {
        // Create a new product based on request body 
        const newItem = new flights(req.body);

        // Save the new Item to the database
        await newItem.save();

        // Respond with a success message
        resp.status(201).json({ message: "Product added successfully" });
    } catch (error) {
        // Handle errors
        resp.status(500).json({ message: "An error occurred" });
    }
});


// Define a route to get all items
router.get("/allitems", async (req, resp) => {
    try {
        // Query the database to retrieve all items
        const items = await flights.find();

        // Respond with the list of all items
        resp.status(200).json(items);
    } catch (error) {
        // Handle errors
        resp.status(500).json({ error: "An error occurred" });
    }
});


// Define a route to get item information by name, destination, price
router.get("/search", async (req, resp) => {
    try {
        // Extract the query parameters from the URL
        const { name, destination, price } = req.query;


        // Define a query object to filter the products
        const query = {};

        if (name) {
            query.name = name;
        }

        if (destination) {
            query.destination = destination;
        }

        if (price) {
            query.price = price;
        }

        // Use the flights model to find items based on the query
        const items = await flights.find(query);

        if (items.length === 0) {
            // If no items match the query, respond with a not found message
            resp.status(404).json({ message: "No items found with the given criteria" });
        } else {
            // If items are found, respond with the matching items
            resp.status(200).json(items);
        }
    } catch (error) {
        // Handle errors
        resp.status(500).json({ error: "An error occured" });
    }
});

// Update product by ID
router.put("/update/:_id", async (req, resp) => {
    try {
        // Extract the item ID from the URL parameter
        const itemId = req.params._id;

        // Find the item by its ID
        const item = await flights.findById(itemId);

        if (!item) {
            // If the product is not found, respond with a not found message
            resp.status(404).json({ message: "Product not found" });
            return;
        }

        // Update all fields of the item based on the request body
        item.set(req.body);

        // Save the updated item to the database
        await item.save();

        // Respond with a success message
        resp.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        // Handle errors
        resp.status(500).json({ error: "An error occurred" });
    }
});


// DELETE a product by ID
router.delete("/delete/:_id", async (req, resp) => {
    try {
        const itemId = req.params._id;

        // Find and delete the product by its ID
        const deletedItem = await flights.findOneAndRemove({
            _id: itemId,
        });

        if (!deletedItem) {
            return resp.status(404).json({ message: "Product not found" });
        }

        resp
            .status(200)
            .json({ message: "Product deleted successfully" + deletedProduct });
    } catch (error) {
        console.error(error);
        resp.status(500).json({ message: "Internal Server Error" });
    }
});


// Update product by ID using HTTP PATCH
router.patch("/update/:_id", async (req, resp) => {
    try {
        // Extract the item ID from the URL parameter
        const itemId = req.params._id;

        // Find the item by its ID
        const item = await flights.findById(itemId);

        if (!item) {
            // If the item is not found, respond with a not found message
            return resp.status(404).json({ message: "Item not found" });
        }

        // Update specific fields of the item based on the request body
        if (req.body.airlineName) {
            product.airlineName = req.body.airlineName;
        }

        if (req.body.destination) {
            product.destination = req.body.destination;
        }

        if (req.body.departureDate) {
            product.departureDate = req.body.departureDate;
        }

        if (req.body.returnDate) {
            product.returnDate = req.body.returnDate;
        }

        if (req.body.ticketPrice) {
            product.ticketPrice = req.body.ticketPrice;
        }
        

        // Save the updated item to the database
        await item.save();

        // Respond with a success message
        resp.status(200).json({ message: "Item updated successfully" });
    } catch (error) {
        // Handle errors
        console.error(error);
        resp.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;