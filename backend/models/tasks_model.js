import mongoose from "mongoose";
const taskSchema=new mongoose.Schema({
    title:{
        type :String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    taskid:{
        type:String,
        required:true,
        unique:true
    },
    completed:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
});
export default mongoose.model("Task",taskSchema);