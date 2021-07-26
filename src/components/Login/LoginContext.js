import axios from "axios";
import { createContext, useContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import toasterContext from "../../contexts/ToasterContext";

const LoginContext = createContext({});

export default LoginContext;

const initState = { isShowing: false, data: {}, isLoading: false };
const SET_DATA = `SET_DATA`;
const SET_LOADING = `SET_LOADING`;
const SET_SHOWING = `SET_SHOWING`;

export function LoginProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { makeToast } = useContext(toasterContext);
  const history = useHistory();

  function setData(key, value) {
    console.log(state.data, "state");
    const newData = { ...state.data };
    newData[key] = value;
    console.log(newData);
    dispatch({ type: SET_DATA, payload: newData });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", state.data);
      const { access_token, refresh_token } = res.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      history.push("/main");
    } catch (err) {
      if (err.response) makeToast(err.response.data, "error");
      else {
        makeToast(err.toString(), "error");
      }
    }
    setLoading(false);
  }

  function setLoading(value) {
    dispatch({ type: SET_LOADING, payload: value });
  }

  function setShowing(value) {
    dispatch({ type: SET_SHOWING, payload: value });
  }

  const globals = { state, setData, handleSubmit, setLoading, setShowing };
  return (
    <LoginContext.Provider value={globals}>{children}</LoginContext.Provider>
  );
}

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SHOWING:
      return { ...state, isShowing: payload };
    case SET_DATA:
      return { ...state, data: payload };
    case SET_LOADING:
      return { ...state, isLoading: payload };
    default:
      return { ...state };
  }
}
