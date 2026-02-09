import { data } from "react-router-dom";
import { fetchJobApi,fetchMyJobsApi,deleteJobApi,updateJobApi,createJobApi } from "./jobApi";
import toast from "react-hot-toast";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs",async(query,thunkApi)=>{
    try{
        // console.log("its called")
        const response = await fetchJobApi(query);
        // console.log(response)
        return response

    }
    catch(error){
        return thunkApi.rejectWithValue("Failed to load Jobs!")
    }
})

export const fetchMyJobs = createAsyncThunk("jobs/my-jobs",async(_,thunkApi)=>{
    try{
        return await fetchMyJobsApi()
    }
    catch(error){
        console.log(error)
        thunkApi.rejectWithValue("Failed to load jobs")
    }
})

export const createJob = createAsyncThunk(
  "jobs/create",
  async (jobData, thunkApi) => {
    try {
      return await createJobApi(jobData);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Job creation Failed",
      );
    }
  },
);

export const deleteJob = createAsyncThunk("jobs/delete",async(id,thunkApi)=>{
    try{
        return await deleteJobApi(id)
    }
    catch(error){
        return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to delete")
    }
})

export const updateJob = createAsyncThunk("jobs/update",async({id,data},thunkApi)=>{
    try {
        return await updateJobApi(id,data)
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update",
      );
    }
})

const jobSlice = createSlice(
    {
        name : "jobs",
        initialState : {
            jobs : [],
            error : null,
            loading : false,
            isSearching : false,
            page:null,
            pages:null

        },
        reducers :{

        },
        extraReducers:(builder)=>{
            builder
              .addCase(fetchJobs.pending, (state) => {
                if (state.jobs.length == 0) {
                  ((state.loading = true), (state.error = null));
                } else {
                  state.isSearching = true;
                }
              })
              .addCase(fetchJobs.fulfilled, (state, action) => {
                // console.log(action.payload.jobs);
                ((state.loading = false),
                  (state.isSearching = false),
                  (state.jobs = action.payload.jobs),
                  (state.error = null),
                  (state.page = action.payload.page),
                  (state.pages = action.payload.pages));
                // console.log(state.jobs)
              })
              .addCase(fetchJobs.rejected, (state, action) => {
                ((state.loading = false), (state.error = action.payload));
              })
              .addCase(fetchMyJobs.fulfilled, (state, action) => {
                state.jobs = action.payload.jobs;
              })
              .addCase(deleteJob.pending, (state) => {
                state.loading = true;
              })
              .addCase(deleteJob.fulfilled, (state, action) => {
                state.jobs = state.jobs.filter(
                  (job) => job._id !== action.payload,
                );
                state.loading = false;
                toast.success("Job deleted successfully");
              })
              .addCase(deleteJob.rejected, (state, action) => {
                state.error = action.payload;
                toast.error(action.payload);
              })
              .addCase(updateJob.pending, (state, action) => {
                state.loading = true;
              })
              .addCase(updateJob.fulfilled, (state, action) => {
                state.jobs = state.jobs.map((job) =>
                  job._id === action.payload._id ? action.payload : job,
                );
                toast.success("Job updated successfully");
              })
              .addCase(updateJob.rejected, (state, action) => {
                state.error = action.payload;
                toast.error(action.payload);
              })
              .addCase(createJob.pending, (state) => {
                state.loading = true;
              })

              .addCase(createJob.fulfilled, (state) => {
                state.loading = false;
                toast.success("Job created Successfully");
              })

              .addCase(createJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
              });
        }
    }
)

export default jobSlice.reducer