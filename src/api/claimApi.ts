// src/api/claimApi.ts
import axios from "./axiosInstance";

export const createClaim = (data: any) =>
    axios.post("/claim/add", data);

export const getClaimList = (page = 1, limit = 10) =>
    axios.get(`/claim/list?page=${page}&limit=${limit}`);

export const getClaimDetail = (claimId: number) =>
    axios.get(`/claim/detail?claimId=${claimId}`);

export const updateClaim = (claimId: number, body: any) =>
    axios.put(`/claim/update?claimId=${claimId}`, body);
export const deleteClaim = (claimId: number) =>
    axios.delete(`/claim/delete?claimId=${claimId}`);