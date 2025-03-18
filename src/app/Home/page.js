// "use client";
// import Link from "next/link";

// export default function Page() {
//     return (
//         <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-10 text-center">
//             <div className="flex flex-col">
//             <span className="block text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
//     Welcome to CodeCraft
// </span>

//                 <p className="mt-4 text-gray-100 text-lg">Collaborate on code in real time with your team.</p>

//                 <div className="mt-6 flex flex-wrap justify-center gap-4">
//                     {/* <Link href="/dashboard">
//                         <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
//                             Go to Dashboard
//                         </button>
//                     </Link> */}

//                     {/* <Link href="/admin">
//                         <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
//                             Admin Panel
//                         </button>
//                     </Link> */}

//                     <Link href="/">
//                         <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
//                             Open Workspace
//                         </button>
//                     </Link>
//                 </div>
//             </div>
//         </main>
//     );
// }




"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Page() {
    const repositories = ["3D-Portfolio", "Project", "Port", "Projects", "Git-Test", "Project1"];

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
           {/* Sidebar */}
           <aside className="w-72 p-6 bg-gray-800/80 backdrop-blur-lg border-r border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-gray-200">Top Repositories</h2>
                <div className="space-y-2">
                    <SignedIn>
                        {repositories.map((repo) => (
                            <Link key={repo} href={`/${repo.toLowerCase()}`}>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }} 
                                    className="flex items-center space-x-3 mt-4 cursor-pointer p-3 rounded-lg bg-gray-700/50 hover:bg-gray-600 transition"
                                >
                                    <span>📂</span>
                                    <span className="text-gray-300">{repo}</span>
                                </motion.div>
                            </Link>
                        ))}
                    </SignedIn>
{/* 
                    <Link href="/Realtime">
                            <motion.button 
                                whileHover={{ scale: 1.1 }} 
                                className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600 transition"
                            >
                                Realtime
                            </motion.button>
                        </Link> */}
                    <SignedOut>
                        {repositories.map((repo) => (
                            <SignInButton key={repo} mode="modal">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }} 
                                    className="flex items-center space-x-3 mt-4 cursor-pointer p-3 rounded-lg bg-red-600/50 hover:bg-red-500 transition"
                                >
                                    <span>🔒</span>
                                    <span className="text-gray-300">{repo} (Sign In Required)</span>
                                </motion.div>
                            </SignInButton>
                        ))}
                    </SignedOut>
                </div>
            </aside>


            {/* Main Content */}
            <main className="flex-1 p-10">
                <h1 className="text-4xl font-extrabold text-gray-100">Welcome to CodeCollab</h1>
                <p className="mt-2 text-gray-400 text-lg">Collaborate on code in real-time with your team.</p>

                {/* Tutorial Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    {[
                        { title: "Introduction to GitHub", desc: "Get started using GitHub in less than an hour." },
                        { title: "GitHub Pages", desc: "Create a site or blog from your repositories." },
                        { title: "Code with AI", desc: "Develop with AI-powered suggestions like GitHub Copilot." },
                        { title: "GitHub Actions", desc: "Create a GitHub Action and automate workflows." }
                    ].map((item, index) => (
                        <motion.div 
                            key={index} 
                            whileHover={{ scale: 1.05 }} 
                            className="bg-gray-800/80 p-6 rounded-lg shadow-md transition border border-gray-700"
                        >
                            <h2 className="text-lg font-semibold text-gray-200">{item.title}</h2>
                            <p className="text-gray-400 mt-2">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Buttons Section */}
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    {/* Signed In Buttons */}
                    <SignedIn>
                        <Link href="/profile">
                            <motion.button 
                                whileHover={{ scale: 1.1 }} 
                                className="px-6 py-3 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 transition"
                            >
                                Go to Dashboard
                            </motion.button>
                        </Link>

                        <Link href="/snippets">
                            <motion.button 
                                whileHover={{ scale: 1.1 }} 
                                className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600 transition"
                            >
                                Snippet 
                            </motion.button>
                        </Link>


                        <Link href="/join">
                            <motion.button 
                                whileHover={{ scale: 1.1 }} 
                                className="px-6 py-3 bg-pink-500 text-white rounded-xl shadow-lg hover:bg-green-600 transition"
                            >
                                Real-Time Code Editor 
                            </motion.button>
                        </Link>

                        <Link href="/">
                            <motion.button 
                                whileHover={{ scale: 1.1 }} 
                                className="px-6 py-3 bg-purple-500 text-white rounded-xl shadow-lg hover:bg-purple-600 transition"
                            >
                                Open Workspace
                            </motion.button>
                        </Link>
                    </SignedIn>

                    {/* Signed Out Button */}
                    <SignedOut>
                        <SignInButton mode="modal">
                            <motion.button 
                                whileHover={{ scale: 1.1 }} 
                                className="px-6 py-3 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition"
                            >
                                Sign In to Continue
                            </motion.button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </main>

            {/* Right Sidebar */}
            <aside className="w-72 p-6 bg-gray-800/80 backdrop-blur-lg border-l border-gray-700 hidden md:block">
                <h2 className="text-xl font-bold mb-4 text-gray-200">Latest Updates</h2>
                <ul className="space-y-3 text-sm text-gray-300">
                    <li>🔹 Instant semantic search is now available.</li>
                    <li>🔹 Updates to enterprise account navigation.</li>
                    <li>🔹 Refreshed commit details page UI.</li>
                </ul>
            </aside>
        </div>
    );
}
