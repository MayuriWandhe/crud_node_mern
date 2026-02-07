import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from "cors";

import route from './routes/userRoute.js';
import signupRoute from './routes/signupRoute.js'
import prodRoute from './routes/productRoute.js';

const app = express();
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended : true }));

const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;

console.log('MONGO_URL : ',process.env.MONGO_URL);


mongoose 
    .connect(MONGOURL)
    .then(() =>{
        console.log('DB connected sucessfully.');
        app.listen(PORT, ()=>{
            console.log(`server is running ${PORT}`);
        })
    })
    .catch((err)=> console.log(err , 'error occured, MONGOURL :', MONGOURL))

app.use("/uploads/product/", express.static('uploads/product'));
app.use("/api", route);
app.use("/api/signup", signupRoute);
app.use("/api/product", prodRoute);


