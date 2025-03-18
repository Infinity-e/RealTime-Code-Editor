// import express from "express";
// import cors from "cors";
// import http from "http";
// import "./websocket.js"; // WebSocket setup

// const app = express();
// const server = http.createServer(app);

// app.use(cors());
// app.use(express.json());

// const PORT = 5000;
// server.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });



import express from "express";
import cors from "cors";
import http from "http";
import "./websocket.js"; // WebSocket setup

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
