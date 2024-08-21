import { QueryClient } from '@tanstack/react-query';

// Create a new QueryClient instance with default options
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes (in milliseconds)
            cacheTime: 10 * 60 * 1000, // 10 minutes (in milliseconds)
            refetchOnWindowFocus: false, // Refetch the query when the window regains focus
            refetchOnReconnect: true, // Refetch the query when the network reconnects
            retry: 2, // Number of times to retry failed queries
        },
        mutations: {
            // Default options for mutations can also be set here
        },
    },
});
