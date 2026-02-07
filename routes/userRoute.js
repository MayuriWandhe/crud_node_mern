import express from "express";

import { create, deleteUser, getAllUsers, getUserById, upadte } from "../controller/userController.js";
import auth from "../middleware/auth.js";

const route =  express.Router();

route.post('/user', auth, create);
route.get('/users', auth, getAllUsers);
route.get('/user/:id', getUserById);
route.put('/user/update/:id', upadte);
route.delete('/delete/user/:id', deleteUser)

export default route;