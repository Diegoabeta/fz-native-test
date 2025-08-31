import { AxiosResponse } from "axios";
import { formatDate } from "../uitls/formatting";
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

const USER_PATH = "/user";

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

  async getUsers(page = 0, limit = 20) {
    return this.sendRequest(
      apiClient.get(`${USER_PATH}?page=${page}&limit=${limit}`)
    );
  }

  async getUser(id: string) {
    const result = await this.sendRequest<IUserData>(
      apiClient.get(`${USER_PATH}/${id}`)
    );

    if (result.data) {
      result.data = {
        ...result.data,
        dateOfBirth: formatDate(result.data.dateOfBirth),
      };
    }

    return result;
  }

  async createUser(userData: IUserData) {
    return this.sendRequest(apiClient.post(`${USER_PATH}/create`, userData));
  }

  async updateUser(id: string, userData: Partial<IUserData>) {
    return this.sendRequest(apiClient.put(`${USER_PATH}/${id}`, userData));
  }

  async deleteUser(id: string) {
    return this.sendRequest(apiClient.delete(`${USER_PATH}/${id}`));
  }
}

export const UserClient = new _UserClient();
