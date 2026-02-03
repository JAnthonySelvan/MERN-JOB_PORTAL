import api from "../../services/axios";

export const fetchUsersApi=async()=>{
    const response = await api.get("/admin/users")
    return response.data.users
}

export const fetchRecruitersApi=async()=>{
    const response = await api.get("/admin/recruiters")
    return response.data.recruiters
}