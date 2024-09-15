"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-gray-800 text-white h-16">
      <div className="container mx-auto flex justify-between items-center h-full px-4">
        <Link href="/" className="text-xl font-bold">
          My App
        </Link>
        <div className="space-x-4">
          <ThemeToggle />
          {user && user.role === "ADMINISTRATOR" && (
            <Link href="/dashboard">Dashboard</Link>
          )}
          {user ? (
            <>
              <span>{user.name || user.email}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
