import { createBrowserRouter } from "react-router-dom";
import { RequireAuth } from "../components/common";
import { MainLayout } from "../components/layouts";
import { AuthPage, ErrorPage, GraduatesPage, HomePage, NotFoundPage, ParentsPage, PricingPage, ProfilePage, PsychologistsPage, TeachersPage } from "../pages";


export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainLayout />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <HomePage />},
                { path: 'pricing', element: <PricingPage />},
                { path: 'teachers', element: <TeachersPage />},
                { path: 'psychologists', element: <PsychologistsPage />},
                { path: 'graduates', element: <GraduatesPage />},
                { path: 'parents', element: <ParentsPage />},
                { 
                    path: 'profile', 
                    element: (
                        <RequireAuth>
                            <ProfilePage />
                        </RequireAuth>
                    )
                },
                { path: '*', element: <NotFoundPage />}
            ],
        },
        { 
            path: 'login', 
            errorElement: <ErrorPage />,
            element: <AuthPage mode="login" key="login" />
        },
        { 
            path: 'register', 
            errorElement: <ErrorPage />,
            element: <AuthPage mode="register" key="register" />
        }
    ],
    {
        basename: import.meta.env.BASE_URL,
    }
)