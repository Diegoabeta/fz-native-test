import axios, { AxiosInstance } from "axios";

export const apiClient: AxiosInstance = axios.create({
  baseURL: "https://dummyapi.io/data/v1",
  headers: {
    "app-id": "63473330c1927d386ca6a3a5",
    "Content-Type": "application/json",
  },
});
