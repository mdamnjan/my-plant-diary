import axios from "axios";

// TODO: ideally this should be an env var or there should be a proxy
const API_BASE = process.env.REACT_APP_API_BASE;

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

export const performApiCall = async (method, url, body) => {
  return await axiosInstance
    .request({
      method: method,
      url: url,
      data: body,
    })
    .then((res) => {
      console.log(url, method, res.data, body);
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
            });
          })
          .then((res) => {
            return res.data;
          });
      }
    });
};

export const fetchUser = () => {
  return performApiCall("get", "/me");
};

export const fetchPlants = () => {
  return performApiCall("get", "/plants");
};

export const fetchPlant = (id) => {
  return performApiCall("get", `/plants/${id}`);
};

export const fetchWateringEntries = (plant) => {
  if (plant) {
    return performApiCall("get", `/watering/?plant=${plant}`);
  }
  return performApiCall("get", `/watering`);
};

export const fetchNotes = (plant) => {
  if (plant) {
    return performApiCall("get", `/notes/?plant=${plant}`);
  }
  return performApiCall("get", "/notes");
};

export const fetchTasks = (plant, overdue, interval, completed) => {
  let queryString = `/tasks?plant=${plant || ""}&interval=${interval}&overdue=${
    overdue || false
  }&completed=${completed}`;

  return performApiCall("get", queryString);
};

export const createPlant = (body) => {
  return performApiCall("post", "/plants/", body);
};

export const createWateringEntry = (body) => {
  return performApiCall("post", "/watering/", body);
};

export const createNote = (body) => {
  console.log("body", body);
  return performApiCall("post", "/notes/", body);
};

export const createTask = (body) => {
  return performApiCall("post", "/tasks/", body);
};

export const updatePlant = (plantID, body) => {
  return performApiCall("patch", `/plants/${plantID}/`, body);
};

export const updateWateringEntry = (entryID, body) => {
  return performApiCall("patch", `/watering/${entryID}/`, body);
};

export const updateTask = (taskID, body) => {
  return performApiCall("patch", `/tasks/${taskID}/`, body);
};

export const deletePlant = (plantID) => {
  return performApiCall("delete", `/plants/${plantID}/`);
};

export const deleteWateringEntry = (entryID) => {
  return performApiCall("delete", `/watering/${entryID}/`);
};

export const deleteNote = (noteID) => {
  return performApiCall("delete", `/notes/${noteID}/`);
};

export const deleteTask = (taskID) => {
  return performApiCall("delete", `/tasks/${taskID}/`);
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
      console.log(res);
      let a = `; ${document.cookie}`.match(`;\\s*csrftoken=([^;]+)`);
      console.log("matched cookie", a, a ? a[1] : "");
      axiosInstance.defaults.headers["X-CSRFTOKEN"] = a ? a[1] : "";

      console.log("results of login", res, axiosInstance.defaults);
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
    .catch((error) => (window.location = "/login"));
};
