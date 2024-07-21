import { classNames } from "@/shared/lib/classNames/classNames";
import { ButtonHTMLAttributes, ReactNode, memo } from "react";
import cls from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const { className, children, ...otherProps } = props;

  return (
    <button
      type="button"
      className={classNames(cls.button, {}, [className])}
      {...otherProps}
    >
      {children}
    </button>
  );
});
