import { RootState } from "@/app/providers/store";

export const selectUserAuthData = (state: RootState) => state.user.authData;
