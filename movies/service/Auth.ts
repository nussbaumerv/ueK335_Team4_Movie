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
    AsyncStorage.setItem("userId", String(response.data.user.id));

    return response.data;
  },
  logout: async () => {
    AsyncStorage.setItem("accessToken", "");
    AsyncStorage.setItem("userId", "");
  },
});

export const RegisterAPIRequest = (api: AxiosInstance = baseInstance) => ({
  getAuthToken: async (email: string, password: string, firstname: string, lastname: string, age: number) => {
    const response = await api.post("signup", {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      age: age
    });
    AsyncStorage.setItem("accessToken", response.data.accessToken);
    AsyncStorage.setItem("userId", response.data.id);
    return response.data;
  },
  logout: async () => {
    AsyncStorage.setItem("accessToken", "");
    AsyncStorage.setItem("userId", "");
  },
});

