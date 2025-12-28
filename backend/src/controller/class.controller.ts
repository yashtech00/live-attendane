import classModel from "../models/class.model"
import userModel from "../models/user.model"
import { classSchema } from "../validation/class.validation"
import { createStudentSchema } from "../validation/student.validation"
import { userSchema } from "../validation/user.validation"


export const createClass = async (req: any, res: any) => {
    try {
        const classValidation = classSchema.safeParse(req.body)
        if (!classValidation.success) {
            return res.status(404).json({
                message:"Invalid class data"
            })
        }

        const newClass = await classModel.create(classValidation.data)
        return res.status(201).json({
            message:"Class created successfully",
            data:newClass
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            message:"Internal server error"
        })
    }    


}

export const createStudent = async (req:any,res:any) => {
    try {
        const createStudentValidation = userSchema.safeParse(req.body)

        if (!createStudentValidation.success) {
            return res.status(404).json({
                message:"Invalid student data"
            })
        }

        const newStudent = await classModel.create({
            studentId: req.params.id,
            className: req.body.className,
            teacherId: req.user.id
        })

        return res.status(201).json({
            message:"Student added to class successfully",
            data:newStudent
        })

    } catch (e:any) {
        console.log(e)
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

export const getClassById = async (req: any, res: any) => {
    try {
        const classData = await classModel.findById(req.params.id)
            .populate({
                path: 'studentId',
                select: 'name email' // only include the fields you need
            })
            .populate('teacherId', 'name email'); // also populate teacher if needed

        if (!classData) {
            return res.status(404).json({
                message: "Class not found"
            });
        }

        const response = {
            success: true,
            message: "Class found successfully",
            data: {
                _id: classData._id,
                className: classData.className,
                teacherId: classData.teacherId,
                students: classData.studentId.map(student => ({
                    _id: student._id,
                    name: student.name,
                    email: student.email
                }))
            }
        };

        return res.status(200).json(response);
    } catch (e: any) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: e.message || "Internal server error"
        });
    }
};

export const getAllStudents = async (req: any, res: any) => {
    try {
        const students = await classModel.find({
            teacherId: req.user.id
        }) 
        return res.status(200).json({
            message:"Students fetched successfully",
            data:students
        })
    } catch (e:any) { 
        console.log(e)
        return res.status(500).json({
            message:"Internal server error"
        })

    }
}

