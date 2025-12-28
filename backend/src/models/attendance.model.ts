import mongoose from "mongoose";


const attendanceSchema = new mongoose.Schema({
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Class",
        required:true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },
    status: {
        type:String,
        enum:["Present","Absent"],
        default:"Absent"
    }
})

const attendanceModel = mongoose.model("Attendance",attendanceSchema);
export default attendanceModel;