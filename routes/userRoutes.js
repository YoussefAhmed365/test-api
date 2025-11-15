const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

router.post('/', async (request, response) => {
    try {
        const { name, username, password } = request.body;

        // Hash the password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name,
            username,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        response.status(201).json(savedUser);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

router.get('/', async (_request, response) => {
    try {
        const users = await User.find({});

        response.json(users);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

router.patch('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updates = request.body;

        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!updatedUser) {
            return response.status(404).json({ message: 'User not found!' });
        }

        response.json(updatedUser);
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return response.status(404).json({ message: 'User not found!' });
        }

        response.json({ message: 'User deleted successfully!', user: deletedUser });
    } catch (error) {
        response.status(400).json({ message: error.message });
    }
});

module.exports = router;