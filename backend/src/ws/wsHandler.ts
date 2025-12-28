import { endSession, getActiveSession } from "../utils/attendanceStore";


export const handleMessage = (ws: any, msg: string, wss: any) => {
    const { event, data } = JSON.parse(msg);   

    switch (event) {
        case "ATTENDANCE_MARKED":
            if (ws.user.role !== "teacher") {
                return sendError(ws, "Forbidden,teacher event only")
            }
            const session = getActiveSession();
            if (!session) {
                return sendError(ws, "No active attendance session")
            }
            broadcast(wss, {
                event: "ATTENDANCE_MARKED",
                data
            });
        case "MY_ATTENDANCE":
            if (ws.user.role !== "student") {
                return sendError(ws, "Forbidden, student event only")
            }
            const active = getActiveSession();
            const record = active?.attendance[ws.user.userId];

            ws.send(JSON.stringify({
                event: "MY_ATTENDANCE",
                data: record
            }));
            break;
        case "DONE":
            if (ws.user.role !== "teacher") {
                return sendError(ws, "Forbidden, teacher event only")
            }
            const current = getActiveSession();
            if (!current) {
                return sendError(ws, "No active attendance session")
            }
            endSession();
            broadcast(wss, {
                event: "DONE",
                data: { message: "Attendance persisted" }
            })
            break;
    }
}

const broadcast = (wss: any, payload: any) => {
    wss.clients.forEach((client:any) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(payload));
        }
    })
}

const sendError = (ws: any, message: string) => {
    ws.send(JSON.stringify({
        event: "ERROR",
        data:{message}
    }))
}