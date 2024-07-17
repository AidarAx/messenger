import { FormEvent, useCallback } from "react";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector.ts";
import { selectLoginEmail } from "../../model/selectors/selectLoginEmail/selectLoginEmail.ts";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch.ts";
import { loginActions } from "../..//model/slice/loginSlice.ts";
import { selectLoginPassword } from "../../model/selectors/selectLoginPassword/selectLoginPassword.ts";
import { loginByEmail } from "../../model/services/loginByEmail/loginByEmail.ts";
import { logout } from "../../model/services/logout/logout.ts";

export const LoginForm = () => {
  const email = useAppSelector(selectLoginEmail);
  const password = useAppSelector(selectLoginPassword);
  const dispatch = useAppDispatch();

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

  const onSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      const result = await dispatch(loginByEmail({ email, password }));
      console.log(result);
    },
    [dispatch, email, password]
  );

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          onChange={(e) => onChangePassword(e.target.value)}
          value={password}
          placeholder="password"
        />
        <button>login</button>
      </form>
      <button onClick={onLogout}>logout</button>
    </>
  );
};
