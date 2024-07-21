import { RootState } from "@/app/providers/store";

export const selectLoginIsLoading = (state: RootState) => state.login.isLoading;
