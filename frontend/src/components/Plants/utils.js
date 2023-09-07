import axios from "axios";

const API_BASE = 'http://localhost:8000'

// temporary basic auth for admin
const auth = { auth: { username: "admin", password: "admin" } };

export const fetchPlants = () => {
  return axios.get(`${API_BASE}/plants`, auth);
};

export const fetchWateringEntries = () => {
  return axios.get("/watering", auth);
};

export const fetchNotes = () => {
  return axios.get("/notes", auth);
};

export const createPlant = (body) => {
  return axios.post("/plants/", body, auth);
};

export const createWateringEntry = (body) => {
    return axios.post("/watering/", body, auth);
  };

export const updatePlant = (plantID, body) => {
  return axios.put(`/plants/${plantID}/`, body, auth);
};

export const updateWateringEntry = (entryID, body) => {
    return axios.put(`/watering/${entryID}/`, body, auth);
  };

export const deletePlant = (plantID) => {
  return axios.delete(`/plants/${plantID}/`, auth);
};

export const deleteWateringEntry = (entryID) => {
    return axios.delete(`/watering/${entryID}/`, auth);
  };
