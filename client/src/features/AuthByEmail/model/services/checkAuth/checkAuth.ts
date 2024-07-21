import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/store";
import { userActions } from "@/entities/User";
import { AuthData } from "@/entities/User";

export const checkAuth = createAsyncThunk<AuthData, void, ThunkConfig<string>>(
  "auth/checkAuth",
  async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.get<AuthData>("/refresh");

      if (!response.data) {
        throw new Error();
      }

      dispatch(userActions.setAuthData(response.data));

      console.log("refresh");

      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
