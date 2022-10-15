import axios from "axios";

// temporary basic auth for admin
const auth = { auth: { username: "admin", password: "admin" } };

export const fetchPlants = (filters) => {
  return axios.get(`/plants/?search=${filters}`, auth);
};

export const fetchWateringEntries = () => {
  return axios.get("/watering", auth);
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
