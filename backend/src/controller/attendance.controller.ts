import attendanceModel from "../models/attendance.model"

export const myAttendance = async (req: any, res: any) => {
    try {
        const attendance = await attendanceModel.find({
            studentId: req.user.id
        })
        return res.status(200).json({
            message:"Attendance fetched successfully",
            data:attendance
        })
    } catch (e:any) {
        console.log(e)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const startAttendance = async (req: any, res: any) => {
    try {
        const start = await attendanceModel.create()
    } catch (e) {
        
    }
}