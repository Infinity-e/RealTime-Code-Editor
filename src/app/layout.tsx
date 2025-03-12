import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs"; // ✅ Import ClerkProvider
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-800 to-black text-gray-100 flex flex-col`}
        >
          
          <ConvexClientProvider>
            <Navbar/>
            <main className="flex-grow">{children}</main>
          </ConvexClientProvider>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}



// https://emkc.org/api/v2/piston/runtimes