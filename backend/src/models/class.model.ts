import mongoose from "mongoose";


const classSchema = new mongoose.Schema({
    className:{
        type:String,
        required:true
    },
    studentId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    }],
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher",
        required:true
    }
})

const classModel = mongoose.model("Class",classSchema);
export default classModel;