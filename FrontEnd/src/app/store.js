import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice"
import authReducer from "../features/auth/authSlice"
import jobReducer from "../features/job/jobSlice"
import applicationReducer from "../features/application/applicationSlice"

export const store = configureStore({
    reducer:{
        theme : themeReducer,
        auth : authReducer,
        jobs : jobReducer,
        application : applicationReducer
    }
})