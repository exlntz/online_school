import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layouts";
import { AuthPage, GraduatesPage, HomePage, NotFoundPage, ParentsPage, PricingPage, ProfilePage, PsychologistsPage, TeachersPage } from "../pages";


export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout />,
            children: [
                { index: true, element: <HomePage />},
                { path: 'pricing', element: <PricingPage />},
                { path: 'teachers', element: <TeachersPage />},
                { path: 'psychologists', element: <PsychologistsPage />},
                { path: 'graduates', element: <GraduatesPage />},
                { path: 'parents', element: <ParentsPage />},
                { path: 'profile', element: <ProfilePage />},
                { path: '*', element: <NotFoundPage />}
            ],
        },
        { 
            path: 'login', 
            element: <AuthPage mode="login" key="login" />
        },
        { 
            path: 'register', 
            element: <AuthPage mode="register" key="register" />
        }
    ],
    {
        basename: import.meta.env.BASE_URL,
    }
)