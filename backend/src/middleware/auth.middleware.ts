
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "Unauthorized"
            })
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decodedToken;
        next();
    } catch (e) {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized"
        })
    }
}   

export const isTeacher = (req: any, res: any, next: any) => {
    if (req.user.role !== "Teacher") {
        return res.status(401).json({
            status: 401,
            message: "Unauthorized"
        })
    }
    next();
}
