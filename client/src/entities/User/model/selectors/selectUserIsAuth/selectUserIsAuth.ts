import { RootState } from "@/app/providers/store";

export const selectUserIsAuth = (state: RootState) => state.user.isAuth;
