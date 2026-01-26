import { applyJobApi, getMyApplicationsApi } from "./applicationApi";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

export const applyJob = createAsyncThunk("application/apply",async(jobId,thunkApi)=>{
    try{
        return await applyJobApi(jobId)
    }
    catch(error){
        // console.log(error.response.data.message)
       return thunkApi.rejectWithValue(error.response?.data?.message || "Already applied!")
    }   
})

export const getMyApplications = createAsyncThunk("application/me",async(_,thunkApi)=>{
    try{
        return await getMyApplicationsApi()
    }
    catch(error){
        return thunkApi.rejectWithValue("Failed to load applications");
    }
})

const applicationSlice = createSlice(
    {
        name : "application",
        initialState : {
            appliedJobs : [],
            error : null,
            loading : false
        },
        extraReducers : (builder)=>{
            builder
                .addCase(applyJob.pending,(state)=>{
                    state.loading = true,
                    state.error = null
                })
                .addCase(applyJob.fulfilled,(state,action)=>{
                    state.loading = false
                    state.appliedJobs.push(action.meta.arg)
                    // console.log(state.appliedJobs)
                    // console.log(action.meta.arg)
                })
                .addCase(applyJob.rejected,(state,action)=>{
                    state.loading = false;
                    state.error=action.payload
                    // console.log("error")
                    
                })
                .addCase(getMyApplications.fulfilled,(state,action)=>{
                    state.appliedJobs = action.payload.applications.map((app)=>app.job)
                })
        }
    }
)

export default applicationSlice.reducer