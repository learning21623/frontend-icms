// src/api/staffApi.ts
import axios from "./axiosInstance";

// ✅ Add staff entry
export const addStaff = (data: { userId: number; hospitalId: number | undefined; role: string }) =>
  axios.post("/staff/add", data);

export const getStaffList = (page = 1, limit = 10) =>
  axios.get(`/staff/list?page=${page}&limit=${limit}`);

// ✅ Corrected to use ?id= to match backend pattern
export const getStaffDetail = (id: number) =>
  axios.get(`/staff/detail?id=${id}`);

export const updateStaff = (id: number, body: any) =>
  axios.put(`/staff/update?id=${id}`, body);

export const deleteStaff = (id: number) =>
  axios.delete(`/staff/delete?id=${id}`);