

export const handleMessage = (ws: any, msg: string, wss: any) => {
    const { event, data } = JSON.parse(msg);   

    switch (event) {
        case "ATTENDANCE_MARKED":
            if (ws.user.role !== "teacher") {
                return sendError(ws, "Forbidden,teacher event only")
            }
    }
}