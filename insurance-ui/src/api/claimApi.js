import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/claims"
});

// Attach JWT automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchClaims = () => API.get("/");
export const createClaim = (data) => API.post("/", data);
export const updateClaim = (claimId,status) => API.put(`/${claimId}/status`,{status});