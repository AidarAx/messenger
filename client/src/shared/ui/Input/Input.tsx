import { classNames } from "@/shared/lib/classNames/classNames";
import { InputHTMLAttributes, memo } from "react";
import cls from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  value?: string | number;
}

export const Input = memo((props: InputProps) => {
  const { className, value, type, placeholder, onChange, ...otherProps } =
    props;

  return (
    <input
      onChange={onChange}
      type={type}
      value={value}
      placeholder={placeholder}
      className={classNames(cls.input, {}, [className])}
      {...otherProps}
    />
  );
});
