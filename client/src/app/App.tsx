import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ACCESS_TOKEN } from "@/shared/const/localStorage";
import { checkAuth } from "@/features/AuthByEmail";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      dispatch(checkAuth());
    }
  }, []);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
