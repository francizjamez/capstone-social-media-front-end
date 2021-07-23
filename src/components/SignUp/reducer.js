import axios from "axios";

export const initState = { data: {}, showPassword: false };

export const SET_DATA = `SET_DATA`;
export const SET_SHOW_PASSWORD = `SET_SHOW_PASSWORD`;

export function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_DATA:
      return { ...state, data: payload };
    case SET_SHOW_PASSWORD:
      return { ...state, showPassword: payload };
    default:
      return { ...state };
  }
}

export async function handleSubmit(e, state, history, toast) {
  e.preventDefault();
  console.log(state);
  try {
    await axios.post("auth/signup", state.data);
    history.push("/login");
  } catch (err) {
    console.log(err);
    if (err.response) {
      toast({
        title: err.response.data,
        status: "error",
        isClosable: true,
      });
    }
  }
}

export const changeData = (key, value, state) => {
  const newData = { ...state.data };
  newData[key] = value;

  return {
    type: SET_DATA,
    payload: newData,
  };
};
