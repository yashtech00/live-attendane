import express from "express";
import { getAllStudent, loginUser, meUser, registerUser } from "../controller/user.controller";
import { authMiddleware, isTeacher } from "../middleware/auth.middleware";

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/getAllStudent", authMiddleware,isTeacher, getAllStudent)
userRouter.get("/me", authMiddleware, meUser)


export default userRouter