import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,   // 5 min
        gcTime: 10 * 60 * 1000,     // 10 min
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
