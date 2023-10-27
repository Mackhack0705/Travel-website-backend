import mongoose, { mongo } from "mongoose";
import flights from "./userSchema.js";  // collection
import connectDB from "../connections/db.js"; // connection

const createDocument = async () => {
    try {
        // connect to the database
        await connectDB();

        const newItem = new flights({
            "id": 101,
            "airlineName": "SkyJet",
            "destination": "Spain",
            "departureDate": "2024-1-5",
            "returnDate": "2024-1-10",
            "ticketPrice": "500",
        });

        const result = await newItem.save();
        console.log("Document saved successfully:", result);
    } catch (error) {
        console.log("Error Occured:", error);
    } finally {
        // close the database connection
        mongoose.connection.close();
    }
};

createDocument();



// const getItems = async () => {
//     try {
//         // Connect to the database
//         await connectDB();

//         // Use the find() method to retrieve all documents from the flights collection
//         const Items = await flights.find();


//         // Log the Retrieved Items
//         console.log("Retrieved Items:");
//         console.log(Items);
//     } catch (error) {
//         console.log("Error Occured:", error);
//     } finally {
//         // Close the database connection
//         mongoose.connection.close();
//     }
// };

// getItems();


// const calculateAverageTicketPriceByDestination = async () => {
//     try {
//         // Connect to the database
//         await connectDB();

//         // Use the aggregate framework to calculate the average price by destination
//         const result = await flights.aggregate([
//             {
//                 $group: {
//                     _id: "$destination",
//                     averageTicketPrice: { $avg: "$ticketPrice" },
//                 },
//             },
//             {
//                 $sort: { averageTicketPrice: 1}, // sort the average ticket price in ascending order
//             }
//         ]);

//         if(result.length > 0) {
//             console.log("Average Ticket Price By Destination:");
//             result.forEach((destinationData) => {
//                 console.log(
//                     `${destinationData._id}: $${destinationData.averageTicketPrice.toFixed(2)}`
//                 );
//             });

//             // Determine the destination with lowest average ticket price
//             const cheapestDestination = result[0]._id;
//             console.log(
//                 `Destination with the lowest ticket price: ${cheapestDestination}`
//             );
//         } else {
//             console.log("No flight found.");
//         }
//     } catch (error) {
//         console.log("Error Occured:", error);
//     } finally {
//         // Close the database connection
//         mongoose.connection.close();
//     }
// };

// calculateAverageTicketPriceByDestination();


// const createDocuments = async () => {
//     try {
//         // Connect to the database
//         await connectDB();

//         const newProducts = [
//             {
//                 "id": 99,
//                 "airlineName": "CityFly Airlines",
//                 "destination": "Goa",
//                 "departureDate": "2032-02-15",
//                 "returnDate": "2032-02-25",
//                 "ticketPrice": "500",
//             }, {
//                 "id": 97,
//                 "airlineName": "Sky High Airlines",
//                 "destination": "Goa",
//                 "departureDate": "2031-12-05",
//                 "returnDate": "2031-12-15",
//                 "ticketPrice": "500",
//             }, {
//                 "id": 102,
//                 "airlineName": 'IndiGo',
//                 "destination": 'Goa',
//                 "departureDate": '2023-12-5',
//                 "returnDate": '2023-12-10',
//                 "ticketPrice": "500",
//             }
//         ];

//         const result = await flights.insertMany(newProducts);
//         console.log("Documents saved successfully:", result);
//     } catch (error) {
//         console.log("Error occurred:", error);
//     } finally {
//         // Close the database connection
//         mongoose.connection.close();
//     }
// };

// createDocuments();


// const updateManyDocuments = async (destination, newTicketPrice) => {
//     try {
//         // Connect to the database
//         await connectDB();

//         // Update all documents that match the condition
//         const updateResult = await flights.updateMany(
//             { destination: destination}, // The condition to match the condition
//             { $set: { ticketPrice: newTicketPrice } } // The update to apply
//         );


//         // Find and retrieve the updated documents
//         const updatedDocuments = await flights.find({ destination: destination });

//         if (updateResult.nModified === 0) {
//             console.log("No documents were updated.");
//         } else {
//             console.log("documents updated successfully.");
//             console.log("updated documents:", updatedDocuments);
//         }
//     } catch (error) {
//         console.log("Error occurred:", error);
//     } finally {
//         // close the database connection
//         mongoose.connection.close();
//     }
// };

// updateManyDocuments("Goa", 500);


// const deleteDocumentsByDestination = async (destination) => {
//     try {
//         // Connect to the database
//         await connectDB();

//         // Delete all documents that match the condition
//         const deleteResult = await flights.deleteMany({
//             destination: destination
//         });

//         if(deleteResult.deletedCount === 0) {
//             console.log("No documents matching the condition were found.");
//         } else {
//             console.log(deleteResult.deletedCount, "documents deleted successfully.");
//         }
//     } catch (error) {
//         console.log("Error occurred:", error);
//     } finally {
//         // Close the database connection
//         mongoose.connection.close();
//     }
// };

// deleteDocumentsByDestination("Goa");