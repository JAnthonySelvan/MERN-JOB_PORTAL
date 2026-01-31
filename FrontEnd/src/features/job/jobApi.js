import api from "../../services/axios";


export const fetchJobApi =async (page, keyword, location) => {
    const response = await api.get(`/jobs${page}&${keyword}&${location}`);
  return response.data
};


export const fetchMyJobsApi = async()=>{
    const response = await api.get("/jobs/my-jobs")
    // console.log(response)
    return response.data
}