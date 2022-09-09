import axios from "axios";

// temporary basic auth for admin
const auth = { auth: { username: "admin", password: "admin" } };

export const fetchPlants = () => {
  return axios.get("/plants", auth);
};

export const createPlant = (body) => {
    return axios.post("/plants/", body, auth);
}

export const updatePlant = (plantID, body) => {
    return axios.put(`/plants/${plantID}/`, body, auth);
}

export const deletePlant = (plantID) => {
  return axios.delete(`/plants/${plantID}/`, auth);
};
