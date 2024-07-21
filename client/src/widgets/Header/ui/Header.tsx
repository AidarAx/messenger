import { classNames } from "@/shared/lib/classNames/classNames";
import { memo, useCallback } from "react";
import cls from "./Header.module.scss";
import { logout } from "@/features/AuthByEmail";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/shared/const/router";

interface HeaderProps {
  className?: string;
}

export const Header = memo((props: HeaderProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = useCallback(() => {
    dispatch(logout());
    navigate(AppRoutes.LOGIN);
  }, [dispatch]);

  return (
    <header className={classNames(cls.header, {}, [className])}>
      header
      <button onClick={onLogout}>Logout</button>
    </header>
  );
});
