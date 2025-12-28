import {WebSocketServer} from "ws"
import jwt from "jsonwebtoken"
export const initWebSocket = (server: any) => {
    const wss = new WebSocketServer({ server })
    
    wss.on("connection", (ws: any, req) => {
        try {
            const url = new URL(req.url!, "http://localhost");
            const token = url.searchParams.get("token");;
            if (!token) {
                ws.send(JSON.stringify)({
                    event: "ERROR",
                    data:{message:"Token missing"}
                })
                ws.close();
                return;
            }

            const decoded:any = jwt.verify(token,process.env.JWT_SECRET!);
            ws.user = {
                userId: decoded.userId,
                role:decoded.role
            }

            ws.on("message", (msg: string) => {
                handleMessage(ws, msg, wss);
            });
        } catch (e) {
            ws.send(JSON.stringify({
                event: "ERROR",
                data:{message:"Invalid token"}
            }))
            ws.close();
        }
    })
}