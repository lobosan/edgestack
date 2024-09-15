import { useAuth } from "@/hooks/useAuth";

export function WelcomeMessage() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (!user) return null;

  return (
    <div
      className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"
      role="alert"
    >
      <p className="font-bold">Welcome, {user.email}!</p>
      <p>You are now logged in as a {user.role.toLowerCase()}.</p>
    </div>
  );
}
