// src/api/doctorApi.ts
import axios from "./axiosInstance";

// ✅ Add doctor (linking userId and specialization)
export const addDoctor = (data: { userId: number; hospitalId: number | undefined; specialization: string }) =>
  axios.post("/doctor/add", data);

// ✅ Create the user account first
export const registerUser = (data: any) => 
  axios.post("/user/add", data);

export const getDoctorList = (page = 1, limit = 10) =>
  axios.get(`/doctor/list?page=${page}&limit=${limit}`);

export const getDoctorDetail = (id: number) =>
  axios.get(`/doctor/detail?id=${id}`);

export const updateDoctor = (id: number, body: any) =>
  axios.put(`/doctor/update?id=${id}`, body);

export const deleteDoctor = (id: number) =>
  axios.delete(`/doctor/delete?id=${id}`);
