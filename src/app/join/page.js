"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // Ensure you install uuid: `npm install uuid`

export default function JoinRoom() {
    const [name, setName] = useState("");
    const [roomId, setRoomId] = useState("");
    const router = useRouter();

    const createRoom = () => {
        const newRoomId = uuidv4(); // Generate unique Room ID
        setRoomId(newRoomId);
    };

    const joinRoom = () => {
        if (!name || !roomId) {
            alert("Please enter a name and a valid Room ID.");
            return;
        }
        router.push(`/editor?roomId=${roomId}&name=${name}`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6">Join or Create a Room</h1>
            <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 p-2 text-black rounded-md"
            />
            <input
                type="text"
                placeholder="Enter Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="mb-4 p-2 text-black rounded-md"
            />
            <button
                onClick={createRoom}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
            >
                Create Room
            </button>
            <button
                onClick={joinRoom}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Join Room
            </button>
        </div>
    );
}
