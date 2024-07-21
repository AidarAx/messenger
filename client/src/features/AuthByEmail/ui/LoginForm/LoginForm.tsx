import { FormEvent, memo, useCallback } from "react";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector.ts";
import { selectLoginEmail } from "../../model/selectors/selectLoginEmail/selectLoginEmail.ts";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch.ts";
import { loginActions } from "../..//model/slice/loginSlice.ts";
import { selectLoginPassword } from "../../model/selectors/selectLoginPassword/selectLoginPassword.ts";
import { loginByEmail } from "../../model/services/loginByEmail/loginByEmail.ts";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "@/shared/const/router.ts";
import cls from "./LoginForm.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames.ts";
import { Input } from "@/shared/ui/Input/Input.tsx";
import { Button } from "@/shared/ui/Button/Button.tsx";
import { selectLoginError } from "../../model/selectors/selectLoginError/selectLoginError.ts";
import { selectLoginIsLoading } from "../../model/selectors/selectLoginIsLoading/selectLoginIsLoading.ts";

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
        <div className={cls.label}>Email</div>
        <Input
          type="email"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          placeholder="Электронная почта"
          className={cls.input}
        />
        <div className={cls.label}>Password</div>
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
