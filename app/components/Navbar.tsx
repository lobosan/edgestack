"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-gray-800 dark:text-white text-lg font-semibold"
            >
              EdgeStack
            </Link>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            {isLoggedIn ? (
              <>
                <span className="text-gray-800 dark:text-white mx-4">
                  {user?.name || user?.email}
                </span>
                <button
                  onClick={() => logout()}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-400 mx-4"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
