import { fetchUsersApi,fetchRecruitersApi } from "./adminApi";
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const fetchUsers = createAsyncThunk("fetch/users",async(_,thunkApi)=>{
    try{
        return await fetchUsersApi()
    }
    catch(error){
        return thunkApi.rejectWithValue("Failed to fetch")
    }
})

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

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    recruiters: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        toast.success("Users Fetched Successfully");
      })
      .addCase(fetchRecruiters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecruiters.fulfilled, (state, action) => {
        state.loading = false;
        state.recruiters = action.payload;
        toast.success("Recruiters Fetched Successfully");
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      })
      .addCase(fetchRecruiters.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload);
      });

  },
});

export default adminSlice.reducer;
