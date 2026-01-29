import express from "express";
import { create, getAllProducts, getProductByd, update } from "../controller/productController.js";

const prodRoute = express.Router();

prodRoute.post('/create', create);
prodRoute.get('/list', getAllProducts);
prodRoute.get('/:id', getProductByd);
prodRoute.put('/update/:id', update);


export default prodRoute;