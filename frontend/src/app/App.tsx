import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { RouterProvider } from "react-router/dom";
import { router } from "./router";


const queryClient = new QueryClient()

function App() {
    useEffect(() => {
        const handleUnauthorized = () => {
            const currentPath = router.state.location.pathname;
            const publicPaths = ['/', '/pricing'];
            
            if (!publicPaths.includes(currentPath) && currentPath !== '/login' && currentPath !== '/register') {
                router.navigate('/login', { replace: true });
                queryClient.clear();
            }
        };

        window.addEventListener('auth:unauthorized', handleUnauthorized);
        
        return () => {
            window.removeEventListener('auth:unauthorized', handleUnauthorized);
        };
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    )
}

export default App
