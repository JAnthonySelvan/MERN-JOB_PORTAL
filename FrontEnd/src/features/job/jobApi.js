import api from "../../services/axios";

export const fetchJobApi = async (page, keyword, location) => {
  const response = await api.get(`/jobs${page}&${keyword}&${location}`);
  return response.data;
};

export const fetchMyJobsApi = async () => {
  const response = await api.get("/jobs/my-jobs");
  // console.log(response)
  return response.data;
};

export const deleteJobApi = async (id) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};

export const updateJobApi = async (id, data) => {
  const response = await api.put(`/jobs/${id}`, data);
  return response.data;
};

export const createJobApi = async (jobData) => {
  const response = await api.post("/jobs", jobData);
  return response.data;
};