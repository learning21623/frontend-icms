// src/api/staffApi.ts
import axios from "./axiosInstance";

export const addStaff = (data: any) =>
  axios.post("/staff/add", data);

export const getStaffList = (page = 1, limit = 10) =>
  axios.get(`/staff/list?page=${page}&limit=${limit}`);

export const getStaffDetail = (staffId: number) =>
  axios.get(`/staff/detail?staffId=${staffId}`);

export const updateStaff = (staffId: number, body: any) =>
  axios.put(`/staff/update?staffId=${staffId}`, body);

export const deleteStaff = (staffId: number) =>
  axios.delete(`/staff/delete?staffId=${staffId}`);
