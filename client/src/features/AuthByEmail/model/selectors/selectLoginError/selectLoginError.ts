import { RootState } from "@/app/providers/store";

export const selectLoginError = (state: RootState) => state.login.error;
