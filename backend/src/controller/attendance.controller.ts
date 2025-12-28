import attendanceModel from "../models/attendance.model";
import classModel from "../models/class.model";
import { getActiveSession, startSession } from "../utils/attendanceStore";

export const myAttendance = async (req: any, res: any) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        message: "Forbidden, student only"
      });
    }

    const attendance = await attendanceModel.find({
      studentId: req.user.id
    }).sort({ startedAt: -1 });

    return res.status(200).json({
      message: "Attendance fetched successfully",
      data: attendance
    });

  } catch (e: any) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};



export const startAttendance = async (req: any, res: any) => {
  try {
    const teacherId = req.user.id;
    const classId = req.params.id;

    if (req.user.role !== "teacher") {
      return res.status(403).json({
        message: "Forbidden, teacher only"
      });
    }

    // Verify class exists & belongs to teacher
    const classData = await classModel.findOne({
      _id: classId,
      teacherId
    });

    if (!classData) {
      return res.status(404).json({
        message: "Class not found or not authorized"
      });
    }

    // Check if session already running
    const activeSession = getActiveSession();
    if (activeSession) {
      return res.status(400).json({
        message: "Attendance session already active"
      });
    }

    // ✅ Start in-memory attendance session
    const session = startSession(classId, teacherId);

    return res.status(200).json({
      message: "Attendance started successfully",
      data: {
        classId,
        startedAt: session.startedAt
      }
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
