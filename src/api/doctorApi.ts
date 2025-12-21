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

export const getDoctorDetail = (doctorId: number) =>
  axios.get(`/doctor/detail?doctorId=${doctorId}`);

export const updateDoctor = (doctorId: number, body: any) =>
  axios.put(`/doctor/update?doctorId=${doctorId}`, body);

export const deleteDoctor = (doctorId: number) =>
  axios.delete(`/doctor/delete?doctorId=${doctorId}`);
