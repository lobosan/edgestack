import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("/api/auth/verify", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Verification failed");
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth"], null);
      queryClient.clear();
      // Force a hard reload to clear all client-side state
      window.location.href = "/";
    },
  });

  return {
    user,
    isLoading,
    logout: logoutMutation.mutate,
  };
}
