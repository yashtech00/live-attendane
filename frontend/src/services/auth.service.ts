import { axiosInstance } from "./api"


export const register = async () => {
    try {
        const response = await axiosInstance().post("/api/auth/register")
        return response.data
    } catch (error) {
        console.error(error);
    }
}

export const login = async () => {
    try{
        const response = await axiosInstance().post("/api/auth/login")
        return response.data
    }
    catch(error){
        console.error(error);
    }
}

export const me = async () => {
    try {
        const response = await axiosInstance().get("/api/auth/me")
        return response.data
    } catch (e) {
        console.error(e);
    }
}