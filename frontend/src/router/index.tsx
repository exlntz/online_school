import { createBrowserRouter, Outlet } from "react-router-dom";
import { RequireAuth } from "../components/auth";
import { MainLayout, ProfileLayout } from "../components/layouts";
import { AuthPage, ErrorPage, GraduatesPage, HomePage, LearningPage, NotFoundPage, ParentsPage, PricingPage, ProfilePage, PsychologistPage, PsychologistsPage, SettingsPage, StatisticsPage, TeachersPage } from "../pages";


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
                { path: '*', element: <NotFoundPage />}
            ],
        },
        {
            path: '/profile',
            element: (
                <RequireAuth>
                    <Outlet />
                </RequireAuth>
            ),
            errorElement: <ErrorPage />,
            children: [
                {
                    element: <ProfileLayout />,
                    children: [
                        { index: true, element: <ProfilePage />}, 
                        { path: 'settings', element: <SettingsPage />},
                    ]
                },
                {
                    element: <ProfileLayout />,
                    children: [
                        { path: 'learning', element: <LearningPage />}, 
                        { path: 'psychologist', element: <PsychologistPage />}, 
                        { path: 'statistics', element: <StatisticsPage />},
                    ]
                }
            ]
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