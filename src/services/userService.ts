import { AxiosResponse } from "axios";
import { apiClient } from "./apiClient";

export type Title = "mr" | "ms" | "mrs" | "miss" | "dr" | "";
export type Gender = "male" | "female" | "other" | "";

export interface IUserData {
  id: string;
  title: Title;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  dateOfBirth: string;
  phone: string;
  picture?: string;
}

class _UserClient {
  private async sendRequest<T>(request: Promise<AxiosResponse<T>>) {
    try {
      const response = await request;
      return { data: response.data, status: response.status };
    } catch (error: any) {
      return {
        error: error.response?.data || error.message,
        status: error.response?.status || 500,
      };
    }
  }

  async getUsers(page = 0, limit = 6) {
    return this.sendRequest(apiClient.get(`/user?page=${page}&limit=${limit}`));
  }

  async getUser(id: string) {
    return this.sendRequest(apiClient.get(`/user/${id}`));
  }

  async createUser(userData: IUserData) {
    return this.sendRequest(apiClient.post("/user/create", userData));
  }

  async updateUser(id: string, userData: Partial<IUserData>) {
    return this.sendRequest(apiClient.put(`/user/${id}`, userData));
  }

  async deleteUser(id: string) {
    return this.sendRequest(apiClient.delete(`/user/${id}`));
  }
}

export const UserClient = new _UserClient();
