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

  addMovie: async (values: any) => {
    const response = await api.post("film", values);
    return response.data;
  },

  updateMovieById: async (id: number, values: MovieType) => {
    const response = await api.put("film/" + id, values);
    return response.data as MovieType;
  },
});