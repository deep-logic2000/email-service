import axios from "axios";

const BASE_URL = "http://68.183.74.14:4005/api";

const USERNAME = "7_test_fron";
const PASSWORD = "vikXrEjU";
const EMAIL = "7_test_fron@test.com";

const credentials = `${USERNAME}:${PASSWORD}`;
const base64Credentials = btoa(credentials);

export const getAllEmailsApi = (offset, limit) => {
  console.log("getAllEmailsApi -> offset", offset);
  console.log("getAllEmailsApi -> limit", limit);
  return axios.get(`${BASE_URL}/emails/?offset=${offset}&limit=${limit}`, {
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      "Content-Type": "application/json",
    },
  });
};

export const getCurrentUserApi = () => {
  return axios.get(`${BASE_URL}/users/current`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const sendEmailApi = (emailData) => {
  return axios.post(`${BASE_URL}/emails/`, emailData, {
    headers: {
      Authorization: `Basic ${base64Credentials}`,
      "Content-Type": "application/json",
    },
  });
};

export const createUserApi = (userData) => {
  return axios.post(`${BASE_URL}/users/`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};