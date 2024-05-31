import axios from "axios";

// TODO: ideally this should be an env var or there should be a proxy
const API_BASE = process.env.REACT_APP_API_BASE;

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const performApiCall = async ({ method, url, body, params }) => {
  return await axiosInstance
    .request({
      method: method,
      url: url,
      data: body,
      params: params,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        // refresh the token and try again
        return refreshToken()
          .then(() => {
            return axiosInstance.request({
              method: method,
              url: url,
              data: body,
              params: params,
            });
          })
          .then((res) => {
            return res.data;
          });
      }
    });
};

export const fetchUser = () => {
  return performApiCall({ method: "get", url: "/me" });
};

export const fetchPlants = () => {
  return performApiCall({ method: "get", url: "/plants" });
};

export const fetchPlant = (id) => {
  return performApiCall({ method: "get", url: `/plants/${id}` });
};

export const fetchWateringEntries = (plant) => {
  if (plant) {
    return performApiCall({ method: "get", url: `/watering/?plant=${plant}` });
  }
  return performApiCall({ method: "get", url: `/watering` });
};

export const fetchNotes = (plant) => {
  if (plant) {
    return performApiCall({ method: "get", url: `/notes/?plant=${plant}` });
  }
  return performApiCall({ method: "get", url: "/notes" });
};

export const fetchTasks = ({
  plant,
  overdue = false,
  interval,
  completed,
  date,
}) => {
  const params = {
    ...(plant && { plant: plant }),
    ...(overdue && { overdue: overdue }),
    ...(interval && { interval: interval }),
    ...(completed && { completed: completed }),
    ...(date && { month_of: date }),
  };

  return performApiCall({ method: "get", url: "/tasks/", params: params });
};

export const createPlant = (body) => {
  return performApiCall({ method: "post", url: "/plants/", body: body });
};

export const createNote = (body) => {
  return performApiCall({ method: "post", url: "/notes/", body: body });
};

export const createTask = (body) => {
  console.log("body", body)
  return performApiCall({ method: "post", url: "/tasks/", body: body });
};

export const updatePlant = (plantID, body) => {
  return performApiCall({
    method: "patch",
    url: `/plants/${plantID}/`,
    body: body,
  });
};

export const updateTask = (taskID, body) => {
  return performApiCall({
    method: "patch",
    url: `/tasks/${taskID}/`,
    body: body,
  });
};

export const deletePlant = (plantID) => {
  return performApiCall({ method: "delete", url: `/plants/${plantID}/` });
};

export const deleteWateringEntry = (entryID) => {
  return performApiCall({ method: "delete", url: `/watering/${entryID}/` });
};

export const deleteNote = (noteID) => {
  return performApiCall({ method: "delete", url: `/notes/${noteID}/` });
};

export const deleteTask = (taskID) => {
  return performApiCall({ method: "delete", url: `/tasks/${taskID}/` });
};

export const login = (body) => {
  return axiosInstance
    .post(
      "/login/",
      { username: body.username, password: body.password },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      let a = `; ${document.cookie}`.match(`;\\s*csrftoken=([^;]+)`);
      axiosInstance.defaults.headers["X-CSRFTOKEN"] = a ? a[1] : "";

      return res;
    });
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
  return axiosInstance
    .post("/token/refresh/", {
      withCredentials: true,
    })
    .catch((error) => {
      localStorage.setItem("isLoggedIn", false);
      window.location = "/login";
    });
};
