const mongoose = require('mongoose')

const userAuthSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['subscriber', 'creator'],
        default: 'subscriber' // Default role is subscriber
    },
    creator_subscriber : mongoose.Schema.Types.ObjectId
    // You can add more authentication-related fields here if needed
});

// Schema for Subscriber
const subscriberSchema = new mongoose.Schema({
    name: String,

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'userAuthSchema' }, // Reference to the User schema
    subscriptions: [{type : {
        course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }, // Reference to the Course schema
        progress: { type: Number, default: 0 }, // Progress of the subscriber within the course (e.g., current level)
        subscriptionStartDate: { type: Date, default: Date.now }, // Start date of course subscription
        subscriptionEndDate: Date // End date of course subscription
    }, default: []}],
    interestedTopics: [{type: String, default:[]}]
});

const creatorSchema = new mongoose.Schema({
    name: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'userAuthSchema' }, // Reference to the User schema
    intro: {type:String, default:""}, // Introduction about the creator
    coursesCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course', default:[] }] // Array of courses created by the creator
    // Define other creator properties as needed
});

// Schema for Video
const videoSchema = new mongoose.Schema({
    title: String,
    url: String, // Assuming the video URL here
    transcript: String // Transcript of the video
    // You can add more properties related to the video as needed
});

// Schema for Course
const courseSchema = new mongoose.Schema({
    title: String,
    description: String, // Description of the course
    pricing: { // Pricing details of the course
        type: Number,
        default: 0 // Default pricing
    },
    duration: { // Duration of the course (in weeks, months, etc.)
        type: String,
        default: 'N/A' // Default duration
    },
    levels: [{type: {
        title: String,
        url: String, // Assuming the video URL here
        transcript: String // Transcript of the video
        // You can add more properties related to the video as needed
    }, default:[]}],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ,// Reference to the creator (User schema)
    // Define other course properties as needed
    tags: [String] // Array of strings representing tags related to the course content
    // Define other course properties as needed
});

const Subscriber = mongoose.model('subscriber', subscriberSchema);
const Video = mongoose.model('video', videoSchema);
const UserAuth = mongoose.model('userAuth', userAuthSchema);
const Creator = mongoose.model('creator', creatorSchema);
const Course = mongoose.model('course', courseSchema);

module.exports = {Subscriber,Video,Creator,UserAuth,Course}