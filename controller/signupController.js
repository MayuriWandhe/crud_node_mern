import Signup from "../model/signupModel.js";

export const createUser = async(req, res) =>{
    try {
        const {name, email, password} = req.body;
        const userExist = await Signup.findOne({email});
        if(userExist){
            return res.status(400).json({message : 'User already exists.'});
        }
        const salt = await becrypt.genSalt(10);
        const hashedPassword = await becrypt.hash(password, salt);
        const user = await User.create({
            name,
            email,
            password : hashedPassword
        });
        res.status(200).json({mesaage : 'User registered successfully.'});
    } catch (error) {
        res.status(500).json({message : 'Internal server error.'})
    }
}

export const fetch = async (req, res) =>{
    try{
        const userList = await Signup.find();
        if(!userList){
            res.status(500).json({message : 'User does not exists.'})
        }
        res.status(200).json({userList})
    }catch (error){
        res.status(500).json({message : 'Internal server error.'})
    }
};


export const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const userExist = await Signup.findById(id)
        if(!userExist){
            res.status(400).json({message : 'User not found.'})
        }
        res.status(200).json({userExist})
    } catch (error) {
        res.status(500).json({message : 'Internal server error.'})
    }
}

export const updateUser = async (req, res) =>{
    try {
        const _id = req.params.id;
        const userExsit = await Signup.findById(id);
        // const userExsit = await Signup.findOne({_id:id});
        if(!userExsit){
            res.status(400).json({message : 'User not found.'});
        }
        const updateUser = await Signup.findByIdAndUpdate(_id, req.body, { new : true })
        res.status(201).json({updateUser, message : 'User updated successfully.'});
        console.log(res);
        
    } catch (error) {
        res.status(500).json({message : 'Inetrnal server error.'})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Signup.findById(id);
        console.log('userExist : ', userExist);
        
        if(!userExist){
            res.status(400).json({message : 'User not found.'})
        }
        await Signup.findByIdAndDelete(userExist);
        res.status(200).json({message : 'User deleted successfully.'});
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message : 'Internal server error.'})
    }
}


export const loginUser = async (req, res) =>{
    try {
        const {email, password} = req.params.body;
        const user = await Signup.findOne({email});
        if(!user){
            return res.status(400).json({message : 'User not found.'});
        }
        const isMatch = await bcrypt.compare(password, use.password);
        if(!isMatch){
            return res.status(400).json({message : 'Invalid credentials'});
        }
        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET || "mysecretkey",
            {expiresIn : "1d"}
        );
        res.json({
            message : "Login successfully",
            token,
            user : {
                id : user._id,
                name : user.name,
                email : user.email
            }
        });
    } catch (error) {
        return res.status(500).json({message : 'Invalid token.'});        
    }
}