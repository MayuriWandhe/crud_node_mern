import Signup from "../model/signupModel.js";

export const create = async(req, res) =>{
    try {
        const userData = new Signup(req.body);
        const { email } = userData;
        const userExist = await Signup.findOne({email});
        if(userExist){
            return res.status(400).json({error : 'User already exists.'});
        }
        const savedUser = await userData.save();
        res.status(200).json({savedUser, mesaage : 'User has been created successfully.'});
    } catch (error) {
        res.status(500).json({error : 'Internal server error.'})
    }
}

export const fetch = async (req, res) =>{
    try{
        const userList = await Signup.find();
        if(!userList){
            res.status(500).json({error : 'User does not exists.'})
        }
        res.status(200).json({userList})
    }catch (error){
        res.status(500).json({error : 'Internal server error.'})
    }
};


export const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const userExist = await Signup.findById(id)
        if(!userExist){
            res.status(400).json({error : 'User not found.'})
        }
        res.status(200).json({userExist})
    } catch (error) {
        res.status(500).json({error : 'Internal server error.'})
    }
}

export const updateUser = async (req, res) =>{
    try {
        const _id = req.params.id;
        const userExsit = await Signup.findById(id);
        // const userExsit = await Signup.findOne({_id:id});
        if(!userExsit){
            res.status(400).json({error : 'User not found.'});
        }
        const updateUser = await Signup.findByIdAndUpdate(_id, req.body, { new : true })
        res.status(201).json({updateUser, message : 'User updated successfully.'});
        console.log(res);
        
    } catch (error) {
        res.status(500).json({error : 'Inetrnal server error.'})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Signup.findById(id);
        console.log('userExist : ', userExist);
        
        if(!userExist){
            res.status(400).json({error : 'User not found.'})
        }
        await Signup.findByIdAndDelete(userExist);
        res.status(200).json({message : 'User deleted successfully.'});
    } catch (error) {
        console.log(error);
        
        res.status(500).json({error : 'Internal server error.'})
    }
}
