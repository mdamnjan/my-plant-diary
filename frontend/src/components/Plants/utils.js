import axios from "axios";

const API_BASE = "http://localhost:8000/api";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const fetchPlants = () => {
  return axiosInstance.get(`/plants`);
};

export const fetchPlant = (id) => {
  return axiosInstance.get(`/plants/${id}`);
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

export const authenticate = (body) => {
  return axiosInstance.post(
    "/login/",
    { username: body.username, password: body.password },
    {
      withCredentials: true,
    }
  );
};

export const register = (body) => {
  return axiosInstance.post("/register/", body, {
    withCredentials: true,
  });
};

export const logout = () => {
  return axiosInstance.post("/logout/", {
    withCredentials: true,
  });
};

export const refreshToken = () => {
  return axiosInstance.post("/token/refresh/", {
    withCredentials: true,
  });
};
