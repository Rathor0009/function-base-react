import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/auth/";

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const update = (u_id: string, username: string, email: string) => {
  return axios
    .patch(API_URL + "update", {
      u_id,
      username,
      email,
    })
    .then((response) => {
      return response;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getUser = () => {
  return axios.get(API_URL + "getuser",{ headers: authHeader() }).then((response) => {
    return response;
  })
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
