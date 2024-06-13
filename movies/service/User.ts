import { AxiosInstance } from "axios";
import { UserType } from "../types/User";
import { baseInstance } from "./Api";

export const UserAPI = (api: AxiosInstance = baseInstance) => ({

  getUserById: async (id: number) => {
    const response = await api.get("users/" + id);
    return response.data as UserType;
  },

  deleteUserById: async (id: number) => {
    const response = await api.delete("users/" + id);
    return response.data as UserType;
  },

  isLoggedIn: async () => {
    const response = await api.get("film");
    return response.headers;
  },
});