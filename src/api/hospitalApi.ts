// src/api/hospitalApi.ts
import axios from "./axiosInstance";

export const addHospital = (data: any) =>
  axios.post("/hospital/add", data);

export const getHospitalList = (page = 1, limit = 10) =>
  axios.get(`/hospital/list?page=${page}&limit=${limit}`);

// Fixed to use ?id= to match your backend route
export const getHospitalDetail = (id: number) =>
  axios.get(`/hospital/detail?id=${id}`);

// Fixed to use ?id= to match your backend route
export const updateHospital = (id: number, body: any) =>
  axios.put(`/hospital/update?id=${id}`, body);

export const deleteHospital = (id: number) =>
  axios.delete(`/hospital/delete?id=${id}`);