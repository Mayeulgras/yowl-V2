import { AUTH_TOKEN } from "./constant";
import { ID } from "./constant";
import { USERNAME } from "./constant";
    
export const getToken = () => {
  return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

export const getId = () => {
  return localStorage.getItem(ID);
};

export const setId = (id) => {
  if (id) {
    localStorage.setItem(ID, id);
  }
};

export const removeId = () => {
  localStorage.removeItem(ID);
};

export const getUsername = () => {
  return localStorage.getItem(USERNAME);
};

export const setUsername = (U) => {
  if (U) {
    localStorage.setItem(USERNAME, U);
  }
};

export const removeUsername = () => {
  localStorage.removeItem(USERNAME);
};