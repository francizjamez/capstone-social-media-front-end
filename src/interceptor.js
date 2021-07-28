import { Router } from "react-router-dom";
import axios from "axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

if (window.location.hostname === "localhost") {
  axios.defaults.baseURL = "http://localhost:6001/";
} else {
  axios.defaults.baseURL = "https://cheap-fb.herokuapp.com/";
}

axios.interceptors.request.use(
  async (req) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response) {
      switch (err.response.data.name) {
        case "TokenExpiredError":
          const refreshToken = localStorage.getItem("refresh_token");
          const newAccessToken = await axios.post("/auth/refresh_token", {
            refresh_token: refreshToken,
          });
          localStorage.setItem("access_token", newAccessToken.data);
          history.go("/");
          break;
        case "refreshTokenError":
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("access_token");
          history.go("/");
          break;
        default:
          break;
      }
    }

    return Promise.reject(err);
  }
);

export function HistoryProvider(props) {
  return <Router history={history}>{props.children}</Router>;
}
