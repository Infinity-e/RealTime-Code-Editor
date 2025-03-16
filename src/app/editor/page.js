// "use client";
// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import useWebSocket from "react-use-websocket";

// export default function CodeEditor() {
//     const searchParams = useSearchParams();
//     const roomId = searchParams.get("roomId");
//     const name = searchParams.get("name");
//     const [code, setCode] = useState("");

//     const { sendJsonMessage, lastJsonMessage } = useWebSocket("ws://localhost:8080", {
//         onOpen: () => sendJsonMessage({ type: "join", roomId, name }),
//         shouldReconnect: () => true,
//     });

//     useEffect(() => {
//         if (lastJsonMessage?.type === "codeUpdate") {
//             setCode(lastJsonMessage.code);
//         }
//     }, [lastJsonMessage]);

//     const handleCodeChange = (e) => {
//         setCode(e.target.value);
//         sendJsonMessage({ type: "codeUpdate", roomId, code: e.target.value });
//     };

//     return (
//         <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
//             <h1 className="text-xl font-bold mb-4">Collaborative Code Editor - Room: {roomId}</h1>
//             <textarea
//                 value={code}
//                 onChange={handleCodeChange}
//                 className="w-full h-96 p-2 text-black rounded-md"
//             />
//         </div>
//     );
// }


// "use client";
// import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import useWebSocket from "react-use-websocket";
// import Editor from "@monaco-editor/react";
// import * as Select from "@radix-ui/react-select";
// import * as Avatar from "@radix-ui/react-avatar";
// import Button from "@mui/material/Button";

// export default function CodeEditor() {
//     const searchParams = useSearchParams();
//     const roomId = searchParams.get("roomId");
//     const name = searchParams.get("name");
//     const [code, setCode] = useState("// Start coding here...");
//     const [language, setLanguage] = useState("javascript");
//     const [users, setUsers] = useState([]);

//     const { sendJsonMessage, lastJsonMessage } = useWebSocket("ws://localhost:8080", {
//         onOpen: () => sendJsonMessage({ type: "join", roomId, name }),
//         shouldReconnect: () => true,
//     });

//     useEffect(() => {
//         if (lastJsonMessage) {
//             if (lastJsonMessage.type === "codeUpdate") {
//                 setCode(lastJsonMessage.code);
//             }
//             if (lastJsonMessage.type === "usersUpdate") {
//                 setUsers(lastJsonMessage.users);
//             }
//         }
//     }, [lastJsonMessage]);

//     const handleCodeChange = (newCode) => {
//         setCode(newCode);
//         sendJsonMessage({ type: "codeUpdate", roomId, code: newCode });
//     };

//     return (
//         <div className="flex h-screen bg-gray-900 text-white">
//             {/* Sidebar for Users */}
// <div className="w-1/5 bg-gray-800 p-4 border-r border-gray-700">
//     <h2 className="text-lg font-semibold mb-4">Connected Users</h2>
//     {users.length === 0 ? (
//         <p className="text-gray-400">No users connected</p>
//     ) : (
//         users.map((user, index) => (
//             <div key={index} className="flex items-center gap-3 mb-3">
//                 <Avatar>{user.charAt(0)}</Avatar>
//                 <span>{user}</span>
//             </div>
//         ))
//     )}
// </div>


//             {/* Code Editor Section */}
//             <div className="flex-1 flex flex-col p-4">
//                 <div className="flex justify-between items-center mb-4">
//                     {/* Language Selector */}
//                     <Select.Root value={language} onValueChange={setLanguage}>
//                         <Select.Trigger className="border p-2 rounded-md w-40 bg-white text-black">
//                             <Select.Value />
//                         </Select.Trigger>
//                         <Select.Portal>
//                             <Select.Content className="bg-white border shadow-md rounded-md">
//                                 <Select.Item value="javascript" className="p-2 cursor-pointer hover:bg-gray-200">
//                                     JavaScript
//                                 </Select.Item>
//                                 <Select.Item value="python" className="p-2 cursor-pointer hover:bg-gray-200">
//                                     Python
//                                 </Select.Item>
//                             </Select.Content>
//                         </Select.Portal>
//                     </Select.Root>

//                     {/* Run Code Button */}
//                     <Button variant="contained" color="primary">
//                         Run Code
//                     </Button>
//                 </div>

//                 {/* Monaco Code Editor */}
//                 <Editor
//                     height="80vh"
//                     language={language}
//                     value={code}
//                     onChange={handleCodeChange}
//                     theme="vs-dark"
//                 />
//             </div>
//         </div>
//     );
// }

"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useWebSocket from "react-use-websocket";
import Editor from "@monaco-editor/react";

const defaultCode = {
    javascript: `console.log("Hello, World!");`,
    python: `print("Hello, World!")`,
};

export default function CodeEditor() {
    const searchParams = useSearchParams();
    const roomId = searchParams.get("roomId");
    const name = searchParams.get("name");

    const [code, setCode] = useState(defaultCode.javascript);
    const [language, setLanguage] = useState("javascript");
    const [users, setUsers] = useState([]);
    const [output, setOutput] = useState("Click 'Run Code' to see output...");

    const { sendJsonMessage, lastJsonMessage } = useWebSocket("ws://localhost:8080", {
        onOpen: () => sendJsonMessage({ type: "join", roomId, name }),
        shouldReconnect: () => true,
    });

    useEffect(() => {
        if (lastJsonMessage) {
            if (lastJsonMessage.type === "codeUpdate") {
                setCode(lastJsonMessage.code);
            }
            if (lastJsonMessage.type === "usersUpdate") {
                setUsers(lastJsonMessage.users);
            }
            if (lastJsonMessage.type === "executionResult") {
                setOutput(lastJsonMessage.output.trim() || "No output.");
            }
        }
    }, [lastJsonMessage]);

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        sendJsonMessage({ type: "codeUpdate", roomId, code: newCode });
    };

    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;
        setLanguage(selectedLanguage);
        setCode(defaultCode[selectedLanguage]);
    };

    const handleRunCode = () => {
        setOutput("Running..."); // Show loading
        sendJsonMessage({ type: "runCode", roomId, language, code });
    };

    return (
        <div className="flex h-screen bg-gray-900 text-white">
            {/* Sidebar for Users */}
            <div className="w-1/5 bg-gray-800 p-4 border-r border-gray-700">
                <h2 className="text-lg font-semibold mb-4">Connected Users</h2>
                {users.map((user, index) => (
                    <div key={index} className="flex items-center gap-3 mb-3">
                        <span className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full">
                            {user.name.charAt(0)}
                        </span>
                        <span>{user.name}</span>
                    </div>
                ))}
            </div>

            {/* Code Editor Section */}
            <div className="flex-1 flex flex-col p-4">
                <div className="flex justify-between items-center mb-4">
                    <select
                        onChange={handleLanguageChange}
                        value={language}
                        className="p-2 bg-gray-700 text-white rounded-md"
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                    </select>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
                        onClick={handleRunCode}
                    >
                        Run Code
                    </button>
                </div>
                <Editor
                    height="60vh"
                    language={language}
                    value={code}
                    onChange={handleCodeChange}
                    theme="vs-dark"
                />

                {/* Output Section */}
                <div className="bg-gray-800 mt-4 p-4 rounded-md h-32 overflow-auto border border-gray-700">
                    <h3 className="text-lg font-semibold">Output:</h3>
                    <pre className="text-green-400">{output}</pre>
                </div>
            </div>
        </div>
    );
}
