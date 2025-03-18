import { WebSocketServer } from "ws";
import { executeCode } from "./executeCode.js";

const wss = new WebSocketServer({ port: 8080 });
const rooms = new Map();

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const data = JSON.parse(message);

        if (data.type === "join") {
            const { roomId, name } = data;
            if (!rooms.has(roomId)) rooms.set(roomId, []);
            rooms.get(roomId).push({ ws, name });

            broadcast(roomId, { type: "usersUpdate", users: rooms.get(roomId).map(user => ({ name: user.name })) });
        }

        if (data.type === "codeUpdate") {
            broadcast(data.roomId, { type: "codeUpdate", code: data.code });
        }

        if (data.type === "runCode") {
            executeCode(data.language, data.code, (output) => {
                if (ws.readyState === ws.OPEN) {
                    ws.send(JSON.stringify({ type: "executionResult", output }));
                }
            });
        }
    });

    ws.on("close", () => {
        rooms.forEach((users, roomId) => {
            rooms.set(roomId, users.filter(user => user.ws !== ws));
            broadcast(roomId, { type: "usersUpdate", users: rooms.get(roomId).map(user => ({ name: user.name })) });
        });
    });
});

function broadcast(roomId, message) {
    const users = rooms.get(roomId) || [];
    users.forEach(({ ws }) => {
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify(message));
        }
    });
}

console.log("✅ WebSocket server running on ws://localhost:8080");
