import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserSchema } from "../types/userSchema";

const initialState: UserSchema = {
  authData: undefined,
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      state.isAuth = true;
      localStorage.setItem("token", action.payload.accessToken);
    },
    logout: (state) => {
      state.authData = undefined;
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
