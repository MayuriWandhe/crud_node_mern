import express from "express";
import { addToCart } from "../controller/cartController.js";
import auth from "../middleware/auth.js";

const cartRoute = express.Router();

cartRoute.post('/add', auth, addToCart);

export default cartRoute;

