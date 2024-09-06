import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import doctorRoute from "./routes/doctor.route.js";
import appointmentRoute from "./routes/appointment.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('MongoDb is connected');
})
.catch((err)=>{
    console.log('Error connecting database',err);
});

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000,()=>{
    console.log('App running on port 3000');
})

app.use('/api/auth',authRoute);

app.use('/api/user', userRoute);

app.use('/api/doctor', doctorRoute);

app.use('/api/appointment', appointmentRoute);

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message 
    });
})