import { LoginForm } from "@/features/AuthByEmail";
import { memo } from "react";

const LoginPage = () => {
  return (
    <>
      <LoginForm />
    </>
  );
};

export default memo(LoginPage);
