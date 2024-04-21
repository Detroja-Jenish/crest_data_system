const express = require('express');
const creatorRouter = express.Router();
const { Creator } = require('./schema');

// Route to get creator details by ID
creatorRouter.get('/creators/:creatorId', async (req, res) => {
    try {
        const { creatorId } = req.params;

        // Find the creator by ID
        const creator = await Creator.findById(creatorId);
        if (!creator) {
            return res.status(404).json({ message: 'Creator not found' });
        }

        res.status(200).json({ creator });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = creatorRouter;
