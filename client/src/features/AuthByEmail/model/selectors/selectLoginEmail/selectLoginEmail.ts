import { RootState } from "@/app/providers/store";

export const selectLoginEmail = (state: RootState) => state.login.email;
