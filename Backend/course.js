const express = require('express');
const courseRouter = express.Router();
const expressFileUpload = require('express-fileupload')
const { Course, Creator } = require('./schema');
const fs = require('fs')
// Route for creating a new course
courseRouter.use(expressFileUpload())

courseRouter.post('/', async (req, res) => {
    try {
        console.log("-------––");
        const { title, description, pricing, duration, tags, creatorId } = req.body;
        
        // Check if the creator exists
        const creator = await Creator.findById(creatorId);
        if (!creator) {
            return res.status(404).json({ message: 'Creator not found' });
        }

        // Create a new course
        const newCourse = new Course({
            title,
            description,
            pricing,
            duration,
            levels : [],
            creator: creatorId,
            tags : []
        });
        console.log(req.files);
        // const files = req.files
        await fs.mkdirSync(newCourse._id.toString())
        levels = []
       
            req.files.video.mv(`${newCourse._id.toString()}/${req.files.video.name}`)
            console.log(`http://127.0.0.1:3001/${newCourse._id.toString()}/${req.files.video.name}`);
            fetch(`http://127.0.0.1:3001/${newCourse._id.toString()}/${req.files.video.name}`).then(async res=>res.json()).then( async res=>{
        const c = await Course.findById(newCourse._id)
                // console.log(data);
                c.levels.push({
                    url: `${newCourse._id.toString()}/${req.files.video.name}`,
                    title: req.body.videoTitle,
                    transcript: res.data
                })
                await c.save();
                console.log('out');
            })
            
      
        // Save the new course
        await newCourse.save();

        // Update the creator's coursesCreated array
        creator.coursesCreated.push(newCourse._id);
        await creator.save();

        res.status(201).json({ message: 'Course created successfully', course: newCourse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

courseRouter.get('/:id', async (req, res) => {
    try {
        const courseId = req.params.id;

        // Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ course });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for getting all courses
courseRouter.get('/', async (req, res) => {
    try {
        // Find all courses
        const courses = await Course.find();

        res.status(200).json({ courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

courseRouter.post('/:courseId/subscribe', async (req, res) => {
    try {
        const { courseId } = req.params;
        const subscriberId = req.user.id; // Assuming you have middleware to extract user ID from JWT

        // Find the subscriber
        const subscriber = await Subscriber.findOne({ user: subscriberId });
        if (!subscriber) {
            return res.status(404).json({ message: 'Subscriber not found' });
        }

        // Check if the subscriber already subscribed to the course
        const existingSubscription = subscriber.subscriptions.find(sub => sub.course.toString() === courseId);
        if (existingSubscription) {
            return res.status(400).json({ message: 'Subscriber already subscribed to this course' });
        }

        // Find the course
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Create a new subscription for the subscriber
        const newSubscription = {
            course: courseId,
            subscriptionStartDate: new Date(),
            subscriptionEndDate : req.subscriptionEndDate
            // You can add more subscription details here if needed
        };

        // Add the new subscription to the subscriber's subscriptions array
        subscriber.subscriptions.push(newSubscription);
        await subscriber.save();

        res.status(200).json({ message: 'Subscription successful', subscriber });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = courseRouter;
