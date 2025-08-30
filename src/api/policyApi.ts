// src/api/policyApi.ts
import axiosInstance from "./axiosInstance";

// List policies (with optional query params for search & filter)
export const getPolicies = (search = "", status = "", page = 1, limit = 10) =>
  axiosInstance.get(
    `/policy/list?page=${page}&limit=${limit}&search=${search}&status=${status}`
  );

// Policy details
export const getPolicyDetails = (policyId: number) =>
  axiosInstance.get(`/policy/detail/?policyId=${policyId}`);

// Add
export const addPolicy = (data: any) =>
  axiosInstance.post("/policy/add", data);

// Update
export const updatePolicy = (policyId: number, data: any) =>
  axiosInstance.put(`/policy/update/?policyId=${policyId}`, data);

// Delete
export const deletePolicy = (policyId: number) =>
  axiosInstance.delete(`/policy/delete?policyId=${policyId}`);

//userCustomers
// ✅ New APIs for customers and insurers
export const getCustomers = () =>
  axiosInstance.get("/user/list/customers");

export const getInsurers = () =>
  axiosInstance.get("/user/list/insurers");