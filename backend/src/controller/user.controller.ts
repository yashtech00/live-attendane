import { Request, Response } from 'express';
import userModel from "../models/user.model";
import { userSchema } from "../validation/user.validation";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const userValidation = userSchema.safeParse(req.body);
        if (!userValidation.success) {
            return res.status(400).json({
                status: 400,
                message: userValidation.error.message
            });
        }

        const existingUser = await userModel.findOne({
            email: userValidation.data.email,
        });

        if (existingUser) {
            return res.status(409).json({
                status: 409,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(userValidation.data.password, 10);
        const newUser = await userModel.create({
            ...userValidation.data,
            password: hashedPassword
        });

        const token = jwt.sign(
            {
                userId: newUser._id,
                role: newUser.role
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        return res.status(201).header("Authorization", `Bearer ${token}`).json({
            status: 201,
            message: "User created successfully",
            data: newUser,
        });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const userValidation = userSchema.safeParse(req.body);
        if (!userValidation.success) {
            return res.status(400).json({
                status: 400,
                message: userValidation.error.message
            });
        }

        const user = await userModel.findOne({
            email: userValidation.data.email
        }).select('+password');

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found"
            });
        }

        const isPasswordMatch = await bcrypt.compare(
            userValidation.data.password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                status: 401,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );

        const { password, ...userWithoutPassword } = user.toObject();

        return res.status(200).header("Authorization", `Bearer ${token}`).json({
            status: 200,
            message: "User logged in successfully",
            data: userWithoutPassword,
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};

// Add these placeholder functions to match the routes
export const getAllStudent = async (req: Request, res: Response) => {
    try {
        const students = await userModel.find({ role: "Student" });
        return res.status(200).json({
            status: 200,
            message: "Students fetched successfully",
            data: students
        });
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
    
};

export const meUser = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({
            status: 401,
            message: "User not authenticated"
        });
        }
        const me = await userModel.findById(req.user.id);
        return res.status(200).json({
            status: 200,
            message: "User fetched successfully",
            data: me
        });
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
};
