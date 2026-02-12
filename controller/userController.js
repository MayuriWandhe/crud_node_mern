import User from "../model/userModel.js";

// create user
export const create = async(req, res) =>{
    try {
        const newUser = new User(req.body);
        const {email} = newUser;

        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({ message : 'User already exist!'});
        }
        const saveData = await newUser.save();
        return res.status(200).json({message : 'User created successfully!'});
    } catch (error) {
       res.status(500).json({errMessage : error.message});
    }
}

// get user list
export const getAllUsers = async(req,res) => {
    try {
        const userData = await User.find();
        if(!userData || userData.length === 0){
            res.status(401).json({ message : 'User not found!'});
        }        
        res.status(200).json(userData);
    } catch (error) {        
        res.status(500).json({ message : error.message });
    }
}

// get user by id
export const getUserById = async(req, res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist) {
            res.status(400).json({ errMessage : 'User does not exist!'});
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({ errMessage : error.message});
    }
}

// update user
export const upadte = async (req, res) =>{
    try {
        const _id = req.params.id;
        const userExist = await User.findById(_id);
        if(!userExist){
            res.status(500).json({errMessage : 'User does not exist!'});
        }
        const updatedData = await User.findByIdAndUpdate(_id, req.body, {new : true}, {message : 'User updated successfully.'});
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ errMessage : error.message});
    }
}

// delete user
export const deleteUser = async (req, res) =>{
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if(!userExist){
            res.status(500).json({ errMessage : 'User does not exist!'})
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({ message : 'User deleted successfully!'});
    } catch (error) {
        res.status(500).json({ errMessage : error.message})
    }
}