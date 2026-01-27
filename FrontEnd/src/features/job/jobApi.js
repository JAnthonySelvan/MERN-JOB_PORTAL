import api from "../../services/axios";


export const fetchJobApi = async(query="")=>{
    const response = await api.get(`/jobs${query}`)
    return response.data

}

export const fetchMyJobsApi = async()=>{
    const response = await api.get("/jobs/my-jobs")
    return response.data
}