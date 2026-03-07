import tasks_model from "../models/tasks_model.js";
import { task } from "../models/tasks_model.js";
const createTask=async(req,res)=>{
    try {
        const {title,description,user,completed}=req.body;
        if(!title || !description || !user){
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }
        const task=await tasks_model.create({
            title,
            description,
            user,
            completed
        });
        res.status(201).json({
            success:true,
            message:"Task created successfully",
            title,
            description,
            user,
            completed
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:"Error creating task",
            error:error.message
        })
    }
}
const getTasks=async(req,res)=>{
    try {
        const tasks=await tasks_model.findById(task._id);
        res.status(200).json({
            success:true,
            message:"Tasks fetched successfully",
            tasks
        })
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:"Error fetching tasks", 
            error:error.message
        })
    }
}
const deleteTask=async(req,res)=>{
    try{
        const {id}=req.params;
        const task=await tasks_model.findByIdAndDelete(id);
        res.status(200).json({
            succes:true,
            message:"Task deleted successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error deleting task"
        })
    }
}
export {createTask,getTasks,deleteTask};