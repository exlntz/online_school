import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layouts";
import { AuthForm } from "../components/ui/AuthForm/AuthForm";
import { HomePage, NotFoundPage, PricingPage, ProfilePage } from "../pages";


export const router = createBrowserRouter(
    [{
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomePage />},
            { path: 'pricing', element: <PricingPage />},
            { path: 'profile', element: <ProfilePage />},
            { path: 'login', element: <AuthForm mode="login" />},
            { path: 'register', element: <AuthForm mode="register" />},
            { path: '*', element: <NotFoundPage />}
        ],
    }],
    {
        basename: import.meta.env.BASE_URL,
    }
)