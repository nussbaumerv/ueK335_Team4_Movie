import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const BASE_URL = `http://vivaldi.daffre.com:3030`;

export const baseInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

baseInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => { 
    let correctPath: boolean = config.url !== "login";

    if (correctPath) {
      const accessToken = await AsyncStorage.getItem("accessToken");  
      if (accessToken) { 
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },

  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
