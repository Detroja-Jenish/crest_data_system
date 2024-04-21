const express = require('express');
const subscriberRouter = express.Router();
const { Subscriber } = require('./schema');

// Route to get subscriber details with all subscribed courses
subscriberRouter.get('/subscribers/:subscriberId', async (req, res) => {
    try {
        const { subscriberId } = req.params;

        // Find the subscriber by ID and populate the subscriptions field with course details
        const subscriber = await Subscriber.findById(subscriberId).populate({
            path: 'subscriptions.course',
            select: 'title description pricing duration levels'
        });

        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }

        res.status(200).json({ subscriber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = subscriberRouter;
