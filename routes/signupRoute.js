import express from "express";
import { create, deleteUser, fetch, getUserById, updateUser } from "../controller/signupController.js";

const signupRoute = express.Router();

signupRoute.get("/fetch", fetch);
signupRoute.get("/user/:id", getUserById);
signupRoute.put("/user/update/:id", updateUser);
signupRoute.post("/create", create);
signupRoute.delete("/user/delete/:id", deleteUser);

export default signupRoute;

