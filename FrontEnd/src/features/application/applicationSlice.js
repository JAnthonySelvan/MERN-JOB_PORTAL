import {
  applyJobApi,
  fetchApplicantsApi,
  getMyApplicationsApi,
  updateApplicationStatusApi,
} from "./applicationApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const applyJob = createAsyncThunk(
  "application/apply",
  async (jobId, thunkApi) => {
    try {
      return await applyJobApi(jobId);
    } catch (error) {
      // console.log(error.response.data.message)
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Already applied!",
      );
    }
  },
);

export const getMyApplications = createAsyncThunk(
  "application/me",
  async (_, thunkApi) => {
    try {
      return await getMyApplicationsApi();
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to load applications");
    }
  },
);

export const fetchApplicants = createAsyncThunk(
  "jobs/applicants",
  async (jobId, thunkApi) => {
    try {
      return await fetchApplicantsApi(jobId);
    } catch (error) {
      return thunkApi.rejectWithValue("Failed to Fetch Applicant!");
    }
  },
);

export const updateApplicationStatus = createAsyncThunk(
  "update/applicationstatus",
  async ({ applicationId, status }, thunkApi) => {
    try {
      return await updateApplicationStatusApi(applicationId, status);
    } catch (error) {
        console.log(error.response.data.message)
    return  thunkApi.rejectWithValue(

        error.response?.data?.message || "Failed to update status",
      );
    }
  },
);

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    appliedJobs: [],
    error: null,
    loading: false,
    applicants: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyJob.pending, (state) => {
        ((state.loading = true), (state.error = null));
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.loading = false;
        state.appliedJobs.push(action.meta.arg);
        // console.log(state.appliedJobs)
        // console.log(action.meta.arg)
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // console.log("error")
      })
      .addCase(getMyApplications.fulfilled, (state, action) => {
        state.appliedJobs = action.payload.applications.map((app) => app.job);
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        state.applicants = action.payload.applications;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        // console.log(action.payload)
        const updatedApp = action.payload.application;
        state.applicants.map((app) => {
          app._id === updatedApp._id ?  updatedApp : app;
        });
      });
  },
});

export default applicationSlice.reducer;
