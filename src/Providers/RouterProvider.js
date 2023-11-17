//-----------React-----------//
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//-----------Pages-----------//
import HomePage from "../Pages/HomePage";
import OnboardingPage from "../Pages/OnboardingPage";
import DashboardPage from "../Pages/DashboardPage";
import ApplicationPage from "../Pages/ApplicationPage";
import PracticePage from "../Pages/PracticePage";
import MetricsPage from "../Pages/MetricsPage";
import ContactsPage from "../Pages/ContactsPage";
import ErrorPage from "../Pages/ErrorPage";
import SettingsPage from "../Pages/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/onboarding",
    element: <OnboardingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "edit/:id",
        element: <ApplicationPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/practice",
    element: <PracticePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/metrics",
    element: <MetricsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contacts",
    element: <ContactsPage />,
    errorElement: <ErrorPage />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
