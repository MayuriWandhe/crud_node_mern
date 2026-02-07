import express from "express";
import { createUser, deleteUser, fetch, getUserById, loginUser, updateUser } from "../controller/signupController.js";

const signupRoute = express.Router();

signupRoute.get("/fetch", fetch);
signupRoute.get("/user/:id", getUserById);
signupRoute.put("/user/update/:id", updateUser);
signupRoute.post("/create", createUser);
signupRoute.delete("/user/delete/:id", deleteUser);
signupRoute.post('/signin', loginUser);

export default signupRoute;

