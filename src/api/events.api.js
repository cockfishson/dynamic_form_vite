import { api, handleApiRequest } from "./api";

export const fetchEvents = () => handleApiRequest(api.get("/events"));
export const getEventById = (id) => handleApiRequest(api.get(`/events/${id}`));
export const createEvent = (data) =>
  handleApiRequest(api.post("/events", data));
export const updateEvent = (id, data) =>
  handleApiRequest(api.put(`/events/${id}`, data));
