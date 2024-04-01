const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../schema/user");
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
    try {
        // Connect to MongoDB using connection pooling options
        await mongoose.connect(process.env.MONGO_URL);

        // Query the database
        const users = await User.find();

        // Respond with the queried users
        res.json(users);
    } catch (error) {
        // Handle errors
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    } finally {
        // Close the database connection
        await mongoose.connection.close();
    }
})

module.exports = router;