import axios from "./axiosInstance";

// Add Doctor
export const addDoctor = (data: {
  userId: number;
  specialization: string;
  department: string;
  designation: "junior" | "senior" | "consultant";
  registrationNumber: string;
}) => axios.post("/doctor/add", data);

// Create User
export const registerUser = (data: any) =>
  axios.post("/user/add", data);

// List Doctors
export const getDoctorList = (page = 1, limit = 10) =>
  axios.get(`/doctor/list?page=${page}&limit=${limit}`);

// Doctor Detail
export const getDoctorDetail = (id: number) =>
  axios.get(`/doctor/detail?id=${id}`);

// Update Doctor
export const updateDoctor = (id: number, body: any) =>
  axios.put(`/doctor/update?id=${id}`, body);

// Delete Doctor
export const deleteDoctor = (id: number) =>
  axios.delete(`/doctor/delete?id=${id}`);