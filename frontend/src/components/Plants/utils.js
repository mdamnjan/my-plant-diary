import axios from "axios";

// TODO: ideally this should be an env var or there should be a proxy
const API_BASE = process.env.REACT_APP_API_BASE;

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

const performApiCall = async (method, url, body) => {
  let res;
  try {
    res = await axiosInstance.request({
      method: method,
      url: url,
      data: body,
    });
  } catch (error) {
    if (error.response.status === 401) {
      // refresh the token and try again
      return refreshToken().then(() => {
        return axiosInstance.request({
          method: method,
          url: url,
          data: body,
        });
      });
    }
  }
  return res;
};

export const fetchPlants = () => {
  return performApiCall("get", "/plants");
};

export const fetchPlant = (id) => {
  return performApiCall("get", `/plants/${id}`);
};

export const fetchWateringEntries = () => {
  return performApiCall("get", "/watering");
};

export const fetchNotes = () => {
  return performApiCall("get", "/notes");
};

export const createPlant = (body) => {
  return performApiCall("post", "/plants/", body);
};

export const createWateringEntry = (body) => {
  return performApiCall("post", "/watering/", body);
};

export const createNote = (body) => {
  return performApiCall("post", "/notes/", body);
};

export const updatePlant = (plantID, body) => {
  return performApiCall("put", `/plants/${plantID}/`, body);
};

export const updateWateringEntry = (entryID, body) => {
  return performApiCall("put", `/watering/${entryID}/`, body);
};

export const deletePlant = (plantID) => {
  return performApiCall("delete", `/plants/${plantID}/`);
};

export const deleteWateringEntry = (entryID) => {
  return performApiCall("delete", `/watering/${entryID}/`);
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
