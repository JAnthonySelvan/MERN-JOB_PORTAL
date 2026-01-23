import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, registerApi, logoutApi } from "./authApi";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    try {
      return await loginApi(data);
    } catch (error) {
      // console.log(error.response?.data?.message);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Login Failed!",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data, thunkApi) => {
    try {
      return await registerApi(data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Register Failed!",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      return await logoutApi();
    } catch (error) {
      return thunkApi.rejectWithValue("Logout Failed!");
    }
  },
);

export const getMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    return await getMeAPI();
  } catch (error) {
    return thunkAPI.rejectWithValue("Not authenticated");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
    isAuthenticated: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        ((state.user = action.payload.user),
          // console.log(state.user)
          (state.error = null));
        ((state.loading = false), (state.isAuthenticated = true));
      })
      .addCase(loginUser.rejected, (state, action) => {
        ((state.error = action.payload), (state.loading = false));
        // console.log(action.payload)
      })
      .addCase(registerUser.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        ((state.loading = false), (state.error = null));
      })
      .addCase(registerUser.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
      })
      .addCase(logoutUser.fulfilled, (state) => {
        ((state.loading = false),
          (state.isAuthenticated = false),
          (state.user = null));
      })
      .addCase(logoutUser.rejected, (state, action) => {
        ((state.error = action.payload), (state.loading = false));
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getMe.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
