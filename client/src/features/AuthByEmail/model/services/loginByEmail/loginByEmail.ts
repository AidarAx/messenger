import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/store";
import { userActions } from "@/entities/User";
import { AuthData } from "@/entities/User";
import { AxiosError, AxiosResponse } from "axios";
import { error } from "console";

interface ServerError {
  errors: string[];
  message: string;
}

interface LoginByEmailProps {
  email: string;
  password: string;
}

export const loginByEmail = createAsyncThunk<
  AuthData,
  LoginByEmailProps,
  ThunkConfig<string | undefined>
>("auth/loginByEmail", async ({ email, password }, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<AuthData>("/login", {
      email,
      password,
    });

    if (!response.data) {
      throw new Error();
    }

    dispatch(userActions.setAuthData(response.data));

    return response.data;
  } catch (e) {
    const error: AxiosError<ServerError> = e as any;
    console.log(error);
    return rejectWithValue(error.response?.data.message);
  }
});
