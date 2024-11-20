import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const handleApiRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
  }
};
