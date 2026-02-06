import {
  fetchUsersApi,
  fetchRecruitersApi,
  updateRecruiterStatusApi,
  fetchAnalyticsApi,
} from "./adminApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const fetchUsers = createAsyncThunk(
  "fetch/users",
  async (_, thunkApi) => {
    try {
      return await fetchUsersApi();
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to fetch");
    }
  },
);

export const fetchRecruiters = createAsyncThunk(
  "fetch/recruiters",
  async (_, thunkApi) => {
    try {
      return await fetchRecruitersApi();
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to fetch");
    }
  },
);

export const updateRecruiterStatus = createAsyncThunk(
  "update/status",
  async ({ id, status }, thunkApi) => {
    try {
      return await updateRecruiterStatusApi(id, status);
    } catch (error) {
      return thunkApi.rejectWithValue("Faild to update");
    }
  },
);

export const fetchAnalytics = createAsyncThunk("fetch/analytics", async () => {
  return await fetchAnalyticsApi();
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    recruiters: [],
    loading: false,
    error: false,
    analytics: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchRecruiters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecruiters.fulfilled, (state, action) => {
        state.loading = false;
        state.recruiters = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      })
      .addCase(fetchRecruiters.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      })
      .addCase(updateRecruiterStatus.fulfilled, (state, action) => {
        state.recruiters = state.recruiters.map((r) =>
          r._id === action.payload._id ? action.payload : r,
        );
      })

      .addCase(updateRecruiterStatus.rejected, (state, action) => {
        state.error = false;
        toast.error(action.payload);
      })
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      });
  },
});

export default adminSlice.reducer;
