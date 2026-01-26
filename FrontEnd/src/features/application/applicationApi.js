import api from "../../services/axios";

export const applyJobApi = async(jobId)=>{
    const response =  await api.post(`/application/${jobId}`)
    return response.data
}

export const getMyApplicationsApi = async()=>{
    const response = await api.get("/application/me")
    return response.data
}