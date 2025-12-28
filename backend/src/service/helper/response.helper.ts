import { Document, DefaultSchemaOptions, Types } from "mongoose";

type ErrorStatus = 400 | 401 | 403 | 404 | 409 | 422 | 429 | 500 | 501 | 503;

interface ResponseOptions {
    status?: number;
    message?: string;
    data?: any;
    error?: string;
    token?: string;
}

const defaultMessageByStatus: Record<ErrorStatus, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    422: "Unprocessable Entity",
    429: "Too Many Requests",
    500: "Internal Server Error",
    501: "Not Implemented",
    503: "Service Unavailable"
};

export const successResponse = (p0: number, p1: string, students: (Document<unknown, {}, { email: string; password: string; role: "Teacher" | "Student"; name?: string | null | undefined; }, { id: string; }, DefaultSchemaOptions> & Omit<{ email: string; password: string; role: "Teacher" | "Student"; name?: string | null | undefined; } & { _id: Types.ObjectId; } & { __v: number; }, "id"> & { id: string; })[], options: ResponseOptions = {}) => {
    const { status = 200, message = "Success", data = null, token } = options;
    
    const response: any = {
        status,
        message,
        data,
    };

    if (token) {
        response.headers = {
            'Authorization': `Bearer ${token}`
        };
    }

    return response;
};

export const errorResponse = (status: ErrorStatus, message?: string, data: any = null, error: string = "") => {
    const defaultMessageByStatus: Record<ErrorStatus, string> = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        409: "Conflict",
        422: "Unprocessable Entity",
        429: "Too Many Requests",
        500: "Internal Server Error",
        503: "Service Unavailable",
        501: ""
    };

    return {
        status,
        message: message ?? defaultMessageByStatus[status],
        data,
        error: error || defaultMessageByStatus[status],
    };
};