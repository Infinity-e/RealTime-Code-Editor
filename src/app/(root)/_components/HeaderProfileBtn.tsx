"use client";
import { SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { User } from "lucide-react";

function HeaderProfileBtn() {
  return (
    <div className="flex items-center gap-3">
      <UserButton>
        <UserButton.MenuItems>
          <UserButton.Link
            label="Profile"
            labelIcon={<User className="size-4 text-indigo-400" />}
            href="/profile"
          />
        </UserButton.MenuItems>
      </UserButton>

      <SignedOut>
        <SignInButton mode="modal">
          <button
            className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/20 
            to-purple-500/20 hover:from-indigo-500/30 hover:to-purple-500/30 border border-indigo-500/30 
            hover:border-indigo-500/50 transition-all duration-300 shadow-md"
          >
            <div
              className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-xl 
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            <User className="size-5 text-indigo-300 group-hover:text-indigo-200 transition-colors" />
            <span
              className="text-sm font-semibold text-indigo-300 group-hover:text-indigo-200 tracking-tight"
            >
              Sign In
            </span>
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}

export default HeaderProfileBtn;