const express = require("express");
const UserModel = require("../schema/user");
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
    try {
        // Query the database
        const users = await UserModel.find();
        
        // Respond with the queried users
        res.json(users);
    } catch (error) {
        // Handle errors
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const user = await UserModel.findById(id)
        res.json(user)
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.post('/', async (req, res) => {
    try {
        const newUser = new UserModel({ ...req.body })
        const insertedUser = await newUser.save()
        return res.status(201).json(insertedUser)
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.put('/:id', async(req, res) => {
    try {
        const { id } = req.params
        const updatedUser = await UserModel.findOneAndUpdate({ _id: id}, req.body, { new: true })
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await UserModel.deleteOne({ _id: id})
        if (deletedUser.deletedCount === 0) {
            return res.status(404).json({ error: "User not found" }); // If no document was deleted, return a 404 error
        }
        return res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;