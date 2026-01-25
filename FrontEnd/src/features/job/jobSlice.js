import { fetchJobApi } from "./jobApi";
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

const jobSlice = createSlice(
    {
        name : "jobs",
        initialState : {
            jobs : [],
            error : null,
            loading : false,
            isSearching : false

        },
        reducers :{

        },
        extraReducers:(builder)=>{
            builder
                .addCase(fetchJobs.pending,(state)=>{
                    if(state.jobs.length==0){
                        state.loading=true,state.error=null
                    }
                    else{
                        state.isSearching=true
                    }
                    
                })
                .addCase(fetchJobs.fulfilled,(state,action)=>{
                    state.loading=false,
                    state.isSearching=false,
                    state.jobs=action.payload.jobs,
                    state.error=null
                    // console.log(state.jobs)
                })
                .addCase(fetchJobs.rejected,(state,action)=>{
                    state.loading= false,
                    state.error=action.payload
                })
        }
    }
)

export default jobSlice.reducer