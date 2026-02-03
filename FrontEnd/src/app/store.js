import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../features/theme/themeSlice"
import authReducer from "../features/auth/authSlice"
import jobReducer from "../features/job/jobSlice"
import applicationReducer from "../features/application/applicationSlice"
import adminReducer from "../features/admin/AdminSlice"

export const store = configureStore({
    reducer:{
        theme : themeReducer,
        auth : authReducer,
        jobs : jobReducer,
        application : applicationReducer,
        admin : adminReducer
    }
})