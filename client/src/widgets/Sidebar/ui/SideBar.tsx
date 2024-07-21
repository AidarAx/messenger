import { memo } from "react";
import cls from "./Sidebar.module.scss";
import { classNames } from "@/shared/lib/classNames";

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
  const { className } = props;

  return (
    <aside className={classNames(cls.sidebar, {}, [className])}>Sidebar</aside>
  );
});
