import classModel from "../models/class.model"
import { classSchema } from "../validation/class.validation"
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
    const userId = req.user.id;
    const userRole = req.user.role;

    const classData = await classModel
      .findById(req.params.id)
      .populate({
        path: "studentId",
        select: "name email role"
      })
      .lean();

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found"
      });
    }

    
    const isTeacher =
      userRole === "Teacher" &&
      classData.teacherId.toString() === userId;

    const isStudent =
      userRole === "Student" &&
      classData.studentId.some(
        (s: any) => s._id.toString() === userId
      );

    if (!isTeacher && !isStudent) {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }

   
    return res.status(200).json({
      success: true,
      data: {
        _id: classData._id,
        className: classData.className,
        teacherId: classData.teacherId, 
        students: classData.studentId.map((student: any) => ({
          _id: student._id,
          name: student.name,
          email: student.email
        }))
      }
    });

  } catch (e: any) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
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

