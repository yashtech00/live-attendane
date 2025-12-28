import { errorResponse } from "../service/helper/response.helper";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return  errorResponse(401, "Unauthorized")
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decodedToken;
        next();
    } catch (e) {
        return errorResponse(401, "Unauthorized");
    }
}   

export const isTeacher = (req: any, res: any, next: any) => {
    if (req.user.role !== "Teacher") {
        return errorResponse(401, "Unauthorized");
    }
    next();
}
