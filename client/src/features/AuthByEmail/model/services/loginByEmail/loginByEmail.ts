import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/entities/User";
import { ThunkConfig } from "@/app/providers/store";
import { userActions } from "@/entities/User/model/slice/userSlice";

interface LoginByEmailProps {
  email: string;
  password: string;
}

export const loginByEmail = createAsyncThunk<
  User,
  LoginByEmailProps,
  ThunkConfig<string>
>("auth/loginByEmail", async ({ email, password }, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi;

  try {
    const response = await extra.api.post<User>("/login", {
      email,
      password,
    });

    if (!response.data) {
      throw new Error();
    }

    dispatch(userActions.setAuthData(response.data));

    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue("error");
  }
});
