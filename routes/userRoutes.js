import express from "express";
import jwt  from "jsonwebtoken";
import users from "../models/roleSchema.js";

const router = express.Router();

import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator" // Add input validation

// Route for user Registeration
router.post(
    "/register",
    [
        // Validate input fields
        body("firstName").notEmpty().withMessage("FirstName is required"),
        body("lastName").notEmpty().withMessage("LastName is required"),
        body("email").isEmail().withMessage("Invalid email format"),
        body("password")
            .isLength({ min:6 })
            .withMessage("Password must be atleast 6 Characters long"),
        body("confirmPassword")
            .isLength({ min:6 })
            .withMessage("Password must be atleast 6 Characters long")
    ],
    async (req, resp) => {
        try {
            // Check the validation errors
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return resp.status(400).json({ error: errors.array() });
            }

            const { firstName, lastName, email, password, confirmPassword } = req.body; // Collect role from the request body

            // Check if the email is already in use
            const existinguser = await users.findOne({ email });
            if(existinguser) {
                return resp.status(400).json({ message: "Email already registered" });
            }

            // Hash and salt the password
            const hashedpassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

            // Create a new user with the hashed password and specified role
            const newUser = new users({
                firstName,
                lastName,
                email,
                password: hashedpassword,
                confirmPassword
                 // Store the role from request body
            });

            // Save the user to the database
            await newUser.save();

            resp.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            console.log(error);
            resp.status(500).json({ message: "Internal Server error" });
        }
    });


    router.post(
        "/login",
        [
            // Validate input fields
            body("email").isEmail().withMessage("Invalid email format"),
            body("password").notEmpty().withMessage("Password id required"),
        ],
        async (req, res) => {
            try {
                // Check the validation errors
                const errors = validationResult(req);
                if(!errors.isEmpty()) {
                    return res.status(400).json({ errors : errors.array() });
                }

                const { email, password } = req.body;

                // Check if the user with the provided email exists
                const user = await users.findOne({ email });
                if(!user) {
                    return res.status(400).json({ message: "User not found" });
                }

                // Compare the provided password with the hashed passsword in the database
                const isPasswordMatch = await bcrypt.compare(password, user.password);

                if(!isPasswordMatch) {
                    return res.status(401).json({ message: "Invalid password" });
                }

                // Create and sign a JWT token for the user
                const token = jwt.sign({ userId: user._id}, "Makehack0705@", {
                    expiresIn: "1d" // Set the token expiration time
                })

                res.status(200).json({token, message: "Login successful" });
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal Server error" });
              }
        }
    );
export default router;