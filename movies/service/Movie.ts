import { AxiosInstance } from "axios";
import { MovieType } from "../types/Movie";
import { baseInstance } from "./Api";

export const MovieAPI = (api: AxiosInstance = baseInstance) => ({
  getMovies: async () => {
    const response = await api.get("film");
    return response.data as MovieType[];
  },

  getMovieById: async (id: number) => {
    const response = await api.get("film/" + id);
    return response.data as MovieType;
  },

  deleteMovieById: async (id: number) => {
    const response = await api.delete("film/" + id);
    return response.data as MovieType;
  },
});