import Signup from "../model/signupModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async(req, res) =>{
    try {
        const {name, email, password} = req.body;
        const userExist = await Signup.findOne({email});
        if(userExist){
            return res.status(400).json({message : 'User already exists.'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await Signup.create({
            name,
            email,
            password : hashedPassword
        });
        res.status(200).json({user,mesaage : 'User registered successfully.'});
    } catch (error) {
        console.log('error : ', error);        
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
        const userExsit = await Signup.findById(_id);
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
        await Signup.findByIdAndDelete(id);
        res.status(200).json({message : 'User deleted successfully.'});
    } catch (error) {
        console.log(error);
        
        res.status(500).json({message : 'Internal server error.'})
    }
}


// export const loginUser = async (req, res) =>{
//     try {
//         const {email, password} = req.body;
//         const user = await Signup.findOne({email});
//         if(!user){
//             return res.status(400).json({message : 'User not found.'});
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if(!isMatch){
//             return res.status(400).json({message : 'Invalid credentials'});
//         }
//         const token = jwt.sign(
//             {id : user._id},
//             process.env.JWT_SECRET || "mysecretkey",
//             {expiresIn : "1d"}
//         );
//         res.json({
//             message : "Login successfully",
//             token,
//             user : {
//                 id : user._id,
//                 name : user.name,
//                 email : user.email
//             }
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message : 'Internal server error.'});        
//     }
// }



// export const loginUser = async (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       if (!email || !password) {
//         return res.status(400).json({ message: "Email and password required" });
//       }
  
//       const user = await Signup.findOne({ email });
  
//       if (!user) {
//         return res.status(404).json({ message: "User not found." });
//       }
  
//       if (!user.password) {
//         return res.status(500).json({
//           message: "User password not set. Please re-register."
//         });
//       }
  
//       const isMatch = await bcrypt.compare(password, user.password);
  
//       if (!isMatch) {
//         return res.status(401).json({ message: "Invalid credentials" });
//       }
  
//       const token = jwt.sign(
//         { id: user._id },
//         process.env.JWT_SECRET || "mysecretkey",
//         { expiresIn: "1d" }
//       );
  
//       res.status(200).json({
//         message: "Login successful",
//         token,
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email
//         }
//       });
  
//     } catch (error) {
//       console.error("Login error:", error);
//       res.status(500).json({ message: "Internal server error." });
//     }
//   };
  




export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await Signup.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Please enter valid password!" });
      }
  
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "mysecretkey",
        { expiresIn: "1d" }
      );
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error." });
    }
  };
  