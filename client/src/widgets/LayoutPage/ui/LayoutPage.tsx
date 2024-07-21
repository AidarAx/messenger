import { Sidebar } from "../../Sidebar";
import { Header } from "../../Header";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import cls from "./LayoutPage.module.scss";

export const LayoutPage = () => {
  return (
    <>
      <main className={cls.layoutPage}>
        <Sidebar />
        <div className={cls.chat}>
          <Header />
          <Suspense fallback="Loading...">
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  );
};
