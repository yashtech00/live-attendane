import express from "express";
import { authMiddleware, isTeacher } from "../middleware/auth.middleware";
import { myAttendance, startAttendance } from "../controller/attendance.controller";

const attendanceRoute = express.Router();

attendanceRoute.get("/my-attendance", authMiddleware, myAttendance);

attendanceRoute.post("/start-attendance", authMiddleware, isTeacher ,startAttendance);

export default attendanceRoute;