import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/store";
import { userActions } from "@/entities/User";

export const logout = createAsyncThunk<void, void, ThunkConfig<string>>(
  "auth/logout",
  async (_, thunkApi) => {
    const { extra, dispatch, rejectWithValue } = thunkApi;

    try {
      const response = await extra.api.post("/logout");

      if (response.status !== 200) {
        throw new Error();
      }

      dispatch(userActions.logout());

      console.log("logout");

      return response.data;
    } catch (e) {
      console.log(e);
      return rejectWithValue("error");
    }
  }
);
