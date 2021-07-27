import axios from "axios";

export const initState = { data: {}, showPassword: false, isLoading: false };

export const SET_DATA = `SET_DATA`;
export const SET_SHOW_PASSWORD = `SET_SHOW_PASSWORD`;
const SET_LOADING = `SET_LOADING`;

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: payload };
    case SET_DATA:
      return { ...state, data: payload };
    case SET_SHOW_PASSWORD:
      return { ...state, showPassword: payload };
    default:
      return { ...state };
  }
}

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export async function handleSubmit(e, state, history, toast, dispatch) {
  e.preventDefault();
  dispatch(setLoading(true));
  try {
    await axios.post("auth/signup", state.data);
    history.push("/login");
  } catch (err) {
    if (err.response) {
      toast({
        title: err.response.data,
        status: "error",
        isClosable: true,
      });
    }
  }
  dispatch(setLoading(false));
}

export const changeData = (key, value, state) => {
  const newData = { ...state.data };
  newData[key] = value;

  return {
    type: SET_DATA,
    payload: newData,
  };
};
