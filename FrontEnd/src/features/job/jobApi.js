import api from "../../services/axios";


export const fetchJobApi = async(query="")=>{
    const response = await api.get(`/jobs${query}`)
    return response.data

}