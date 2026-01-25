import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice"
import authReducer from "../features/auth/authSlice"
import jobReducer from "../features/job/jobSlice"

export const store = configureStore({
    reducer:{
        theme : themeReducer,
        auth : authReducer,
        jobs : jobReducer
    }
})