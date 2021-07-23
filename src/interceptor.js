import { Router } from "react-router-dom";
import axios from "axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

if (window.location.hostname === "localhost") {
  axios.defaults.baseURL = "http://localhost:6001/";
}

axios.interceptors.request.use(
  async (req) => {
    const token = localStorage.getItem("access_token");
    console.log(token);
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err) => {
    console.log(err);
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
          console.log(refreshToken);
          const newAccessToken = await axios.post("/auth/refresh_token", {
            refresh_token: refreshToken,
          });

          localStorage.setItem("token", newAccessToken.data.access_token);
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
