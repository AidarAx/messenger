import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthData, UserSchema } from "../types/userSchema";
import { ACCESS_TOKEN } from "@/shared/const/localStorage";

const initialState: UserSchema = {
  authData: undefined,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthData>) => {
      state.authData = action.payload;
      state.isAuth = true;
      localStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
    },
    logout: (state) => {
      state.authData = undefined;
      state.isAuth = false;
      localStorage.removeItem(ACCESS_TOKEN);
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
