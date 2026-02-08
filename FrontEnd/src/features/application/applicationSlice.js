import {
  applyJobApi,
  fetchApplicantsApi,
  getMyApplicationsApi,
  updateApplicationStatusApi,
  scheduleInterviewApi,
  respondInterviewApi,
} from "./applicationApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../../services/axios";

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
      console.log(error.response.data.message);
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update status",
      );
    }
  },
);

export const scheduleInterview = createAsyncThunk(
  "schedule/interview",
  async ({ applicationId, data }, thunkApi) => {
    try {
      return await scheduleInterviewApi(applicationId, data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to schedule interview",
      );
    }
  },
);

export const respondInterview = createAsyncThunk(
  "respond/interview",
  async ({ applicationId, status }, thunkApi) => {
    try {
      return respondInterviewApi(applicationId, status);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to respond interview",
      );
    }
  },
);

export const editInterview = createAsyncThunk(
  "applications/editInterview",
  async ({ applicationId, data }, thunkAPI) => {
    try {
      const res = await api.put(
        `/application/${applicationId}/edit-interview`,
        data,
      );
      return { applicationId, interview: res.data.interview };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Edit interview failed",
      );
    }
  },
);

export const cancelInterview = createAsyncThunk(
  "application/cancelInterview",
  async (applicationId, thunkAPI) => {
    try {
      await api.delete(`/application/${applicationId}/cancel-interview`);
      return applicationId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Cancel interview failed",
      );
    }
  },
);

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    appliedJobs: [],
    myApplications: [],
    error: null,
    loading: false,
    applicants: [],
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(applyJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(applyJob.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
      
        state.appliedJobs.push(action.payload?.application.job);

        toast.success("Job Applied Successfully");
      })

      .addCase(applyJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Application failed");
      })

      
      .addCase(getMyApplications.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMyApplications.fulfilled, (state, action) => {
        state.loading = false;

        const applications = action.payload.applications;

    
        state.myApplications = applications.map((app) => ({
          ...app,
          jobDeleted: app.job === null,
        }));

     
        state.appliedJobs = applications
          .filter((app) => app.job !== null)
          .map((app) => app.job._id);
      })

      .addCase(getMyApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        state.applicants = action.payload.applications;
      })

      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const updatedApp = action.payload.application;

        state.applicants = state.applicants.map((app) =>
          app._id === updatedApp._id ? updatedApp : app,
        );

        toast.success("Updated Successfully");
      })

      .addCase(scheduleInterview.fulfilled, (state, action) => {
        const { applicationId, interview } = action.payload;

        state.myApplications = state.myApplications.map((app) =>
          app._id === applicationId ? { ...app, interview } : app,
        );
      })

      .addCase(respondInterview.fulfilled, (state, action) => {
        const { applicationId, status } = action.payload;

        state.myApplications = state.myApplications.map((app) =>
          app._id === applicationId
            ? {
                ...app,
                interview: {
                  ...app.interview,
                  status,
                },
              }
            : app,
        );
      })

      .addCase(editInterview.fulfilled, (state, action) => {
        const { applicationId, interview } = action.payload;

        state.applicants = state.applicants.map((app) =>
          app._id === applicationId ? { ...app, interview } : app,
        );
      })

      .addCase(cancelInterview.fulfilled, (state, action) => {
        const applicationId = action.payload;

        state.applicants = state.applicants.map((app) =>
          app._id === applicationId ? { ...app, interview: null } : app,
        );
      });
  },
});

export default applicationSlice.reducer;
