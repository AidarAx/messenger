import { FormEvent, memo, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@/shared/lib/hooks";
import { loginActions } from "../..//model/slice/loginSlice.ts";
import { loginByEmail } from "../../model/services";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/shared/const/router.ts";
import cls from "./LoginForm.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import { Input } from "@/shared/ui/Input/Input.tsx";
import { Button } from "@/shared/ui/Button/Button.tsx";
import {
  selectLoginIsLoading,
  selectLoginPassword,
  selectLoginEmail,
  selectLoginError,
} from "../../model/selectors";

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const email = useAppSelector(selectLoginEmail);
  const password = useAppSelector(selectLoginPassword);
  const error = useAppSelector(selectLoginError);
  const isLoading = useAppSelector(selectLoginIsLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(loginActions.setEmail(value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const response = await dispatch(loginByEmail({ email, password }));
      if (response.meta.requestStatus === "fulfilled") {
        navigate(AppRoutes.MAIN);
      }
    },
    [dispatch, email, password, navigate]
  );

  return (
    <main className={classNames(cls.loginForm, {}, [className])}>
      {error && (
        <div className={cls.error}>
          <span>{error}</span>
        </div>
      )}
      <form className={cls.form}>
        <label className={cls.label}>Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          placeholder="Электронная почта"
          className={cls.input}
        />
        <label className={cls.label}>Password</label>
        <Input
          type="password"
          onChange={(e) => onChangePassword(e.target.value)}
          value={password}
          placeholder="Пароль"
          className={cls.input}
        />
        <Button disabled={isLoading} className={cls.btn} onClick={onLoginClick}>
          Войти
        </Button>
      </form>
    </main>
  );
});
