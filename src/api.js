import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

const handleApiRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API error:", error.response?.data || error.message);
  }
};

export const fetchEvents = () => handleApiRequest(api.get("/events"));
export const getEventById = (id) => handleApiRequest(api.get(`/events/${id}`));
export const createEvent = (data) =>
  handleApiRequest(api.post("/events", data));
export const updateEvent = (id, data) =>
  handleApiRequest(api.put(`/events/${id}`, data));
