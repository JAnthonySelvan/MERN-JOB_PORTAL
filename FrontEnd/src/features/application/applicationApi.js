import api from "../../services/axios";

export const applyJobApi = async(jobId)=>{
    const response =  await api.post(`/application/${jobId}`)
    return response.data
}

export const getMyApplicationsApi = async()=>{
    const response = await api.get("/application/user/myjobs")
    return response.data
}

export const fetchApplicantsApi = async(jobId)=>{
    const response = await api.post(`/application/job/${jobId}`)
    return response.data
}

export const updateApplicationStatusApi = async(applicationId,status)=>{
    const response = await api.patch(`application/${applicationId}/status`,{status : status})
    // console.log(response.data)
    return response.data
}

export const scheduleInterviewApi = async(applicationId,data)=>{
    const response = await api.put(
      `/application/${applicationId}/schedule-interview`,data
    );
    return response.data
}

export const respondInterviewApi = async(applicationId,status)=>{
    const response = await api.put(
      `/application/${applicationId}/respond-interview`,
    {status:status});
    // console.log(response.data)
     return { applicationId, interview: res.data.interview }
}