import { fetchJobApi,fetchMyJobsApi,createJobApi } from "./jobApi";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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

export const createJob = createAsyncThunk("jobs/create",async(jobData,thunkApi)=>{
    try{
        return await createJobApi(jobData)
    }
    catch(error){
      return  thunkApi.rejectWithValue(error.response?.data?.message || "Job creation Failed")
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
                console.log(action.payload.jobs);
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
              .addCase(createJob.pending, (state) => {
                state.loading = true;
              })

              .addCase(createJob.fulfilled, (state) => {
                state.loading = false;
                toast.success("Job created Successfully")
              })

              .addCase(createJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload)
              });
        }
    }
)

export default jobSlice.reducer