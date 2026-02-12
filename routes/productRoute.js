import express from "express";
import { create, deleteProduct, getAllProducts, getMyProducts, getProductByd, update } from "../controller/productController.js";
import { upload } from "../middleware/upload.js";
import auth from "../middleware/auth.js";

const prodRoute = express.Router();

prodRoute.get('/my-products', auth, getMyProducts);
prodRoute.post('/create', auth, upload.single("prodImg"), create);
prodRoute.get('/list', auth, getAllProducts);
prodRoute.get('/:id', auth, getProductByd);
prodRoute.put('/update/:id', auth,upload.single("prodImg"), update);
prodRoute.delete('/delete/:id', auth, deleteProduct);

export default prodRoute;