import axios from "axios";

const API_URL = "https://3.38.191.164";

const instance = axios.create({
  baseURL: API_URL,
});

export const register = async ({ id, password }) => {
  try {
    const response = await instance.post("/register", { id, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API Error Response:", error.response);
    } else {
      console.error("API Error:", error);
    }
    throw error;
  }
};

export const login = async ({ id, password }) => {
  try {
    const response = await instance.post("/login", { id, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API Error Response:", error.response);
    } else {
      console.error("API Error:", error);
    }
    throw error;
  }
};

export const authenticate = async (token) => {
  try {
    const response = await instance.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("API Error Response:", error.response);
    } else {
      console.error("API Error:", error);
    }
    throw error;
  }
};

export default instance;
