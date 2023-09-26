import axios from "axios";

const API_BASE = 'http://localhost:8000'

// temporary basic auth for admin
const auth = { username: "admin", password: "admin" }

const axiosInstance = axios.create({baseURL: API_BASE, auth: auth})

export const fetchPlants = () => {
  return axiosInstance.get(`/plants`);
};

export const fetchWateringEntries = () => {
  return axiosInstance.get("/watering");
};

export const fetchNotes = () => {
  return axiosInstance.get("/notes");
};

export const createPlant = (body) => {
  return axiosInstance.post("/plants/", body);
};

export const createWateringEntry = (body) => {
    return axiosInstance.post("/watering/", body);
  };

export const updatePlant = (plantID, body) => {
  return axiosInstance.put(`/plants/${plantID}/`, body);
};

export const updateWateringEntry = (entryID, body) => {
    return axiosInstance.put(`/watering/${entryID}/`, body);
  };

export const deletePlant = (plantID) => {
  return axiosInstance.delete(`/plants/${plantID}/`);
};

export const deleteWateringEntry = (entryID) => {
    return axiosInstance.delete(`/watering/${entryID}/`);
  };
