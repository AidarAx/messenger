import { configureStore } from "@reduxjs/toolkit";
import { $api } from "@/shared/api/api.ts";
import { loginReducer } from "@/features/AuthByEmail";
import { AxiosInstance } from "axios";
import { userReducer } from "@/entities/User";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api,
        },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface ThunkExtraArg {
  api: AxiosInstance;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: RootState;
}
