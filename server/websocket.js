// // import { WebSocketServer } from "ws";

// // const wss = new WebSocketServer({ port: 8080 }); // WebSocket runs on port 8080

// // let rooms = {}; // Store rooms and connected users

// // wss.on("connection", (ws) => {
// //     console.log("New client connected");

// //     ws.on("message", (message) => {
// //         const data = JSON.parse(message);

// //         if (data.type === "join") {
// //             const { roomId, name } = data;
// //             if (!rooms[roomId]) {
// //                 rooms[roomId] = [];
// //             }
// //             rooms[roomId].push(ws);
// //             console.log(`${name} joined Room: ${roomId}`);
// //         }

// //         // Broadcast changes to all clients in the same room
// //         if (data.type === "codeUpdate") {
// //             const { roomId, code } = data;
// //             rooms[roomId].forEach(client => {
// //                 if (client !== ws && client.readyState === 1) {
// //                     client.send(JSON.stringify({ type: "codeUpdate", code }));
// //                 }
// //             });
// //         }
// //     });

// //     ws.on("close", () => {
// //         console.log("Client disconnected");
// //     });
// // });

// // console.log("WebSocket server running on ws://localhost:8080");


// // const WebSocket = require("ws");
// // const wss = new WebSocket.Server({ port: 8080 });

// // let connectedUsers = new Map(); // Store users with roomId

// // wss.on("connection", (ws) => {
// //     ws.on("message", (message) => {
// //         const data = JSON.parse(message);

// //         if (data.type === "join") {
// //             connectedUsers.set(ws, { name: data.name, roomId: data.roomId });
// //             broadcastUsers(data.roomId);
// //         }

// //         if (data.type === "codeUpdate") {
// //             broadcastToRoom(data.roomId, JSON.stringify({ type: "codeUpdate", code: data.code }));
// //         }
// //     });

// //     ws.on("close", () => {
// //         connectedUsers.delete(ws);
// //         broadcastUsers(); // Update users when someone leaves
// //     });
// // });

// // function broadcastUsers(roomId) {
// //     const usersInRoom = [...connectedUsers.values()].filter(user => user.roomId === roomId);
// //     wss.clients.forEach(client => {
// //         if (client.readyState === WebSocket.OPEN) {
// //             client.send(JSON.stringify({ type: "usersUpdate", users: usersInRoom.map(u => u.name) }));
// //         }
// //     });
// // }
// import { WebSocketServer } from "ws";
// import { exec } from "child_process";

// const wss = new WebSocketServer({ port: 8080 });

// const rooms = new Map(); // Store room data

// wss.on("connection", (ws) => {
//     ws.on("message", (message) => {
//         const data = JSON.parse(message);
        
//         if (data.type === "join") {
//             const { roomId, name } = data;
//             if (!rooms.has(roomId)) rooms.set(roomId, []);
//             rooms.get(roomId).push({ ws, name });

//             // Notify all users in the room
//             broadcast(roomId, { type: "usersUpdate", users: rooms.get(roomId).map(user => ({ name: user.name })) });
//         }

//         if (data.type === "codeUpdate") {
//             broadcast(data.roomId, { type: "codeUpdate", code: data.code });
//         }

//         if (data.type === "runCode") {
//             executeCode(data.language, data.code, (output) => {
//                 ws.send(JSON.stringify({ type: "executionResult", output })); // Send result back
//             });
//         }
//     });

//     ws.on("close", () => {
//         // Remove user from rooms when disconnected
//         rooms.forEach((users, roomId) => {
//             rooms.set(roomId, users.filter(user => user.ws !== ws));
//             broadcast(roomId, { type: "usersUpdate", users: rooms.get(roomId).map(user => ({ name: user.name })) });
//         });
//     });
// });

// // Helper function to broadcast messages to all users in a room
// function broadcast(roomId, message) {
//     const users = rooms.get(roomId) || [];
//     users.forEach(({ ws }) => ws.send(JSON.stringify(message)));
// }

// // Function to execute code
// function executeCode(language, code, callback) {
//     let command;
//     if (language === "javascript") {
//         command = `node -e "${code.replace(/"/g, '\\"')}"`;
//     } else if (language === "python") {
//         command = `python3 -c "${code.replace(/"/g, '\\"')}"`;
//     }

//     exec(command, (error, stdout, stderr) => {
//         if (error) callback(stderr || "Error running code.");
//         else callback(stdout);
//     });
// }

// console.log("WebSocket server running on ws://localhost:8080");


import { WebSocketServer } from "ws";
import { exec } from "child_process";

const wss = new WebSocketServer({ port: 8080 });

const rooms = new Map(); // Store room data

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        const data = JSON.parse(message);
        
        if (data.type === "join") {
            const { roomId, name } = data;
            if (!rooms.has(roomId)) rooms.set(roomId, []);
            rooms.get(roomId).push({ ws, name });

            // Notify all users in the room
            broadcast(roomId, { type: "usersUpdate", users: rooms.get(roomId).map(user => ({ name: user.name })) });
        }

        if (data.type === "codeUpdate") {
            broadcast(data.roomId, { type: "codeUpdate", code: data.code });
        }

        if (data.type === "runCode") {
            executeCode(data.language, data.code, (output) => {
                ws.send(JSON.stringify({ type: "executionResult", output })); // Send result back
            });
        }
    });

    ws.on("close", () => {
        // Remove user from rooms when disconnected
        rooms.forEach((users, roomId) => {
            rooms.set(roomId, users.filter(user => user.ws !== ws));
            broadcast(roomId, { type: "usersUpdate", users: rooms.get(roomId).map(user => ({ name: user.name })) });
        });
    });
});

// Helper function to broadcast messages to all users in a room
function broadcast(roomId, message) {
    const users = rooms.get(roomId) || [];
    users.forEach(({ ws }) => ws.send(JSON.stringify(message)));
}

// Function to execute code
function executeCode(language, code, callback) {
    let command;
    if (language === "javascript") {
        command = `node -e "${code.replace(/"/g, '\\"')}"`;
    } else if (language === "python") {
        command = `python3 -c "${code.replace(/"/g, '\\"')}"`;
    }

    exec(command, (error, stdout, stderr) => {
        if (error) callback(stderr || "Error running code.");
        else callback(stdout);
    });
}

console.log("WebSocket server running on ws://localhost:8080");
