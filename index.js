import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from './routes/userRoute.js';


const app = express();
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

mongoose 
    .connect(MONGOURL)
    .then(() =>{
        console.log('DB connected sucessfully.');
        app.listen(PORT, ()=>{
            console.log(`server is running ${PORT}`);
            
        })
    })
    .catch((err)=> console.log(err))

app.use("/api", route)