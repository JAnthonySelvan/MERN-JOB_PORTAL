import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, registerApi, logoutApi, getMeAPI } from "./authApi";
import toast from "react-hot-toast";
import api from "../../services/axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkApi) => {
    try {
      await loginApi(data)
      await thunkApi.dispatch(getMe())
      return true
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

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (error) {
    // console.log(error)
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Not authenticated",
    );
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
        // state.user=action.payload.user,
        // state.error=null,
        state.loading = false
        toast.success("Login successful");
        // console.log(state.isAuthenticated)
      })
      .addCase(loginUser.rejected, (state, action) => {
        ((state.error = action.payload), (state.loading = false));
        toast.error(action.payload || "Login Failed");
        // console.log(action.payload)
      })
      .addCase(registerUser.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        ((state.loading = false), (state.error = null));
        toast.success(action.payload || "Registered Successfully");
      })
      .addCase(registerUser.rejected, (state, action) => {
        ((state.loading = false), (state.error = action.payload));
        toast.error(action.payload || "Registration failed");
      })
      .addCase(logoutUser.fulfilled, (state) => {
        ((state.loading = false),
          (state.isAuthenticated = false),
          (state.user = null));
        toast.success("Logout Successful");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        ((state.error = action.payload), (state.loading = false));
        toast.error(action.payload || "Logout Failed");
      })
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        // console.log(action.payload)
        // state.error = action.payload; // STRING ONLY
      });
  },
});

export default authSlice.reducer;
