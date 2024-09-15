"use client";

import { WelcomeMessage } from "@/components/WelcomeMessage";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <main className="max-w-3xl">
        <WelcomeMessage />
        <h1 className="text-4xl font-bold mb-4">Welcome to EdgeStack</h1>
        <p className="text-xl mb-8">
          A powerful full-stack boilerplate built with Next.js, featuring custom
          JWT authentication, role-based access control, and integration with
          Neon DB using Prisma ORM.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            title="Next.js App Router"
            description="Utilize the latest Next.js features with the App Router and server actions."
          />
          <FeatureCard
            title="Type-Safe Data Handling"
            description="Leverage Zod and next-safe-action for schema validation and type-safe data fetching."
          />
          <FeatureCard
            title="Custom Authentication"
            description="Implement secure JWT-based authentication with email/password and Google OAuth support."
          />
          <FeatureCard
            title="Role-Based Access Control"
            description="Manage user permissions with built-in roles for guests, users, and administrators."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
