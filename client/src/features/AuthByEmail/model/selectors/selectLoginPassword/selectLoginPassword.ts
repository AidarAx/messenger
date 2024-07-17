import { RootState } from "@/app/providers/store";

export const selectLoginPassword = (state: RootState) => state.login.password;
