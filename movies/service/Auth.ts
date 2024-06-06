import { AxiosInstance } from "axios";
import { baseInstance } from "./Api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginAPIRequest = (api: AxiosInstance = baseInstance) => ({
  getAuthToken: async (email: string, password: string) => {
    const response = await api.post("login", {
      email: email,
      password: password,
    });
    AsyncStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  },
  logout: async () => {
    AsyncStorage.setItem("accessToken", "");
  },
});