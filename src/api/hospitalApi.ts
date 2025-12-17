// src/api/hospitalApi.ts
import axios from "./axiosInstance";

export const addHospital = (data: any) =>
  axios.post("/hospital/add", data);

export const getHospitalList = (page = 1, limit = 10) =>
  axios.get(`/hospital/list?page=${page}&limit=${limit}`);

export const getHospitalDetail = (hospitalId: number) =>
  axios.get(`/hospital/detail?hospitalId=${hospitalId}`);

export const updateHospital = (hospitalId: number, body: any) =>
  axios.put(`/hospital/update?hospitalId=${hospitalId}`, body);

export const deleteHospital = (hospitalId: number) =>
  axios.delete(`/hospital/delete?hospitalId=${hospitalId}`);
