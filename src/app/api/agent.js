import axios from "axios";
import { toast } from "react-toastify";
import history from "../../history";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  console.log(error);
  if (!error.response) {
    toast.error(
      "Network Error : Can't connect to server. Displaying locally cached data. New changes wont be saved."
    );
    throw error;
  } else {
    try {
      const { status, data, config } = error.response;
      /* ALL 404 Errors are redirected to not found component */
      if (status === 404) {
        console.log("404---");
        //history.push("/notfound");
      }

      /* 400 Errors for invalid GUID should also be redirected to not found */
      if (
        status === 400 &&
        config.method === "get" &&
        data.errors.hasOwnProperty("id")
      ) {
        history.push("/notfound");
      }
      else if (
        status === 400 && data!= null
      ){
        toast.error("400 The Request Failed");
      }

      /* 500 Errors */
      if (status === 500) {
        toast.error("Server Error");
      }
    } catch (e) {
    } finally {
      throw error.response;
    }
  }
});

const responseBody = (response) => response.data;

const sleep = (ms) => (response) =>
  new Promise((resolve) => setTimeout(() => resolve(response), ms));

const requests = {
  get: (url) => axios.get(url).then(sleep(2000)).then(responseBody),
  post: (url, body) =>
    axios.post(url, body).then(sleep(2000)).then(responseBody),
  put: (url, body) => axios.put(url, body).then(sleep(2000)).then(responseBody),
  del: (url) => axios.delete(url).then(sleep(2000)).then(responseBody),
};

/* APIS */
const Genomes = {
  list: () => requests.get("/genomes"),
  view: (id) => requests.get(`/genomes/${id}`),
};

const User = {
  current: () => requests.get("/account"),
  register: (user) => requests.post(`/account/register`, user),
};

const Admin = {
  userList: () => requests.get("/admin/accounts"),
  modifyUser: (user) => requests.post(`/admin/accounts/${user.id}`, user),
  addUser: (user) => requests.post(`/admin/accounts/`, user),
};

const exports = {
  Genomes,
  User,
  Admin,
};

export default exports;