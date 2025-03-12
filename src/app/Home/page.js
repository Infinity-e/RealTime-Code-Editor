"use client";
import Link from "next/link";

export default function Page() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-10 text-center">
            <div className="flex flex-col">
            <span className="block text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
    Welcome to CodeCraft
</span>

                <p className="mt-4 text-gray-100 text-lg">Collaborate on code in real time with your team.</p>

                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {/* <Link href="/dashboard">
                        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                            Go to Dashboard
                        </button>
                    </Link> */}

                    {/* <Link href="/admin">
                        <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
                            Admin Panel
                        </button>
                    </Link> */}

                    <Link href="/">
                        <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                            Open Workspace
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
