import express from "express";
import { create, deleteProduct, getAllProducts, getProductByd, update } from "../controller/productController.js";
import { upload } from "../middleware/upload.js";

const prodRoute = express.Router();

prodRoute.post('/create', upload.single("prodImg"), create);
prodRoute.get('/list', getAllProducts);
prodRoute.get('/:id', getProductByd);
prodRoute.put('/update/:id', update);
prodRoute.delete('/delete/:id', deleteProduct);

export default prodRoute;