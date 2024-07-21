import LoginPage from "@/pages/LoginPage/ui/LoginPage";
import { MainPage } from "@/pages/MainPage";
import { AppRoutes } from "@/shared/const/router";
import { LayoutPage } from "@/widgets/LayoutPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <LayoutPage />,
    children: [
      {
        path: AppRoutes.MAIN,
        element: <MainPage />,
      },
    ],
  },
  {
    path: AppRoutes.LOGIN,
    element: <LoginPage />,
  },
]);
