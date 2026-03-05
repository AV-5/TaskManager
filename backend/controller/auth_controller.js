import user_model from "../models/user_model.js";
import bcrypt from "bcryptjs";
const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
        });
        }
        const userexist=await user_model.findOne({email});
        if(userexist){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        const user = await user_model.create({
            name,
            email,
            password
        });
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:"Error registering user",
            error:error.message
        })
    }}
const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
        });
        }
        const user=await user_model.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found"
            })
        }
        const passwordmatch=await bcrypt.compare(password,user.password);
        if(!passwordmatch){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            })
        }
        res.status(200).json({
            success:true,
            message:"Login successful",
            user
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:"Error logging in",
            error:error.message
        })
    }
      
}
export { register, login };