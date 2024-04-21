const express = require('express');
const userAuthRouter = express.Router();
// const bcrypt = require('bcryptjs');
const {Subscriber, Creator, UserAuth} = require('./schema');
const jwt = require('jsonwebtoken');

// Route for user signup

userAuthRouter.post('/signup', async (req, res) => {
    try {
        console.log('here');
        const { email, password, role,name } = req.body;
        console.log(req.body)
        // Check if email already exists
        const existingUser = await UserAuth.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user authentication record
        const newUser = new UserAuth({
            email,
            password,
            role
            
        });

        // Save the new user authentication record

        // Based on the role, create a subscriber or creator record
        if (role === 'subscriber') {
            const newSubscriber = new Subscriber({ user: newUser._id,name });
            newUser.creator_subscriber = newSubscriber._id.toString();
            await newSubscriber.save()
        } else if (role === 'creator') {
            const newCreator = new Creator({ user: newUser._id , name});
            newUser.creator_subscriber = newCreator._id.toString();
            await newCreator.save();
        }
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route for user login
userAuthRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        // Find the user by email
        const user = await UserAuth.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password is correct
        const isPasswordValid = (user.password === password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token

        // Return the token
        res.status(200).send({status: 200,user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = userAuthRouter;
