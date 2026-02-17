import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/policies"
});

// Attach JWT automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchPolicies = () => API.get("/");
export const fetchPolicy = (id) => API.get(`/${id}`);
export const createPolicy = (data) => API.post("/", data);
export const approvePolicy = (id) => API.put(`/${id}/approve`);
export const rejectPolicy = (id) => API.put(`/${id}/reject`);
export const fetchPolicyAuditLogs = (id) => API.get(`/${id}/audits`);

