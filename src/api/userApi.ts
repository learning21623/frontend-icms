import axios from "./axiosInstance";

export const registerUser = (data: any) => {
  return axios.post("/user/add", data);
};

export const loginUser = (data: any) => axios.post('/user/login', data);

export const getUserList = (page = 1, limit = 10) =>
  axios.get(`/user/list?page=${page}&limit=${limit}`);

export const getUserDetail = (userId: number) => {
  return axios.get(`/user/detail?userId=${userId}`);
};

export const updateUser = (userId: number, body: any) => {
  return axios.put(`/user/update?userId=${userId}`, body);
};

export const deleteUser = (userId: number) => {
  return axios.delete(`/user/delete?userId=${userId}`);
};
