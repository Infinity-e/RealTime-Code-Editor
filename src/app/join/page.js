// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid"; // Ensure you install uuid: `npm install uuid`

// export default function JoinRoom() {
//     const [name, setName] = useState("");
//     const [roomId, setRoomId] = useState("");
//     const router = useRouter();

//     const createRoom = () => {
//         const newRoomId = uuidv4(); // Generate unique Room ID
//         setRoomId(newRoomId);
//     };

//     const joinRoom = () => {
//         if (!name || !roomId) {
//             alert("Please enter a name and a valid Room ID.");
//             return;
//         }
//         router.push(`/editor?roomId=${roomId}&name=${name}`);
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
//             <h1 className="text-3xl font-bold mb-6">Join or Create a Room</h1>
//             <input
//                 type="text"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="mb-4 p-2 text-white rounded-md"
//             />
//             <input
//                 type="text "
//                 placeholder="Enter Room ID"
//                 value={roomId}
//                 onChange={(e) => setRoomId(e.target.value)}
//                 className="mb-4 p-2 text-white rounded-md"
//             />
//             <button
//                 onClick={createRoom}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
//             >
//                 Create Room
//             </button>
//             <button
//                 onClick={joinRoom}
//                 className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 Join Room
//             </button>
//         </div>
//     );
// }



"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid"; // Ensure uuid is installed: `npm install uuid`

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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-8 text-center border border-white/20">
                <h1 className="text-3xl font-extrabold text-white mb-6">
                    Join or Create a Room
                </h1>

                {/* Name Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 text-white bg-white/20 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Room ID Input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter Room ID"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        className="w-full px-4 py-3 text-white bg-white/20 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={createRoom}
                        className="w-full bg-blue-500 hover:bg-blue-600 transition-all text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg"
                    >
                        Create Room
                    </button>
                    <button
                        onClick={joinRoom}
                        className="w-full bg-green-500 hover:bg-green-600 transition-all text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg"
                    >
                        Join Room
                    </button>
                </div>
            </div>
        </div>
    );
}
