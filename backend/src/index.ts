import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import http from "http";
const PORT = process.env.PORT || 5000;
const app = express();
import { initWebSocket } from "./ws/wsServer";
import userRouter from "./routes/user.route";
import classRoute from "./routes/class.route";
import attendanceRoute from "./routes/attendance.route";

const server = http.createServer(app);

// Initialize WebSocket
initWebSocket(server);

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRouter)
app.use("/api/class",classRoute)
app.use("/api/attendance",attendanceRoute)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

