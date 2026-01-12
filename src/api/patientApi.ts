import axios from "./axiosInstance";

export const addPatient = (data: any) => axios.post("/patient/add", data);

// Add this to your patientApi.ts
export const getDoctorListForDropdown = () => axios.get("/patient/list-doctors");

// export const getPatientList = (page = 1, limit = 10, search = "") =>
//   axios.get(`/patient/list?page=${page}&limit=${limit}&search=${search}`);

// Updated to include doctorId for filtering
export const getPatientList = (page = 1, limit = 10, search = "", doctorId?: number) =>
  axios.get(`/patient/list?page=${page}&limit=${limit}&search=${search}${doctorId ? `&doctorId=${doctorId}` : ''}`);

// Get Details
export const getPatientDetail = (id: number) => axios.get(`/patient/detail?id=${id}`);

// Update Basic - Needs ?id=
export const updatePatientBasic = (id: number, data: any) => 
    axios.put(`/patient/update-basic?id=${id}`, data);

// Update Medical - Needs ?id=
export const updatePatientMedical = (id: number, data: any) => 
    axios.put(`/patient/update-medical?id=${id}`, data);

// Update Amount - Needs ?id=
export const updatePatientAmount = (id: number, data: any) => 
    axios.put(`/patient/update-amount?id=${id}`, data);

export const deletePatient = (id: number) => 
  axios.delete(`/patient/delete?id=${id}`);