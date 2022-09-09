import axios from "axios";

// temporary basic auth for admin
const auth = { auth: { username: "admin", password: "admin" } };

export const fetchPlants = () => {
  return axios.get("/plants", auth);
};

export const handleCreatePlant = (body) => {
    return axios.post("/plants/", body, auth);
}

export const handleUpdatePlant = (plantID, body) => {
    return axios.put(`/plants/${plantID}/`, body, auth);
}

export const handleDeletePlant = (plantID) => {
  return axios.delete(`/plants/${plantID}/`, auth);
};
