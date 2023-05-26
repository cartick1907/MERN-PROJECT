const express = require('express')
require('dotenv').config({path:__dirname+'/../.env'})
const colors= require ('colors')
const port= process.env.PORT || 5000;
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express();
const connectDB = require('./config/db')
connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, ()=> console.log(`server started on port ${port}`));
