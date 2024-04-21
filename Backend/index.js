const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express');
const userAuthRouter = require('./userAuth')
const bodyParser = require('body-parser');
const courseRouter = require('./course');
const subscriberRouter = require('./subscriber')
const creatorRouter = require('./creator')
//10.4.121.245:3000


mongoose.connect('mongodb://127.0.0.1:27017/nirma')
.then(
    ()=>{
        const app = express()
        app.use(cors())
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json({extended: true}))
        app.use('/login-signup',userAuthRouter)
        app.use('/course',courseRouter)
        app.use('/subsciber',subscriberRouter)
        app.use('/creator',creatorRouter)
        app.get('/',(req,res)=>{
            res.send("hello")
        })
        app.listen(3000,()=>{
            console.log('connected');
        })
    }
    
)
