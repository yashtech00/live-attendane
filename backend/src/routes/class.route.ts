import express from "express";
import { authMiddleware, isTeacher } from "../middleware/auth.middleware";
import { createClass, createStudent, getAllStudents, getClassById } from "../controller/class.controller";

const classRoute = express.Router();

classRoute.post("/", authMiddleware, isTeacher, createClass);
classRoute.post("/:id/add-student", authMiddleware, isTeacher, createStudent)

classRoute.get("/:id", authMiddleware, isTeacher, getClassById)

classRoute.get("/students", authMiddleware, isTeacher, getAllStudents)

export default classRoute;