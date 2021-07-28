import { useQuery } from "react-query";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toasterContext from "../../contexts/ToasterContext";

const MainContext = createContext({});

export default MainContext;

const initState = { data: {}, user: { _id: null } };

export function MainProvider({ children }) {
  const [state, setState] = useState(initState);
  const { data, isError, err } = useQuery("user", fetchUser);
  const { makeToast } = useContext(toasterContext);

  if (isError) {
    makeToast(err, "error");
  }

  useEffect(() => {
    if (data) {
      updateStateKey(`user`, data);
    }
    // eslint-disable-next-line
  }, [data]);

  function setData(key, value) {
    const newData = { ...state.data };
    newData[key] = value;
    updateStateKey(`data`, newData);
  }

  async function handleAddPost(e, onClose) {
    e.preventDefault();
    await axios.post("/post", state.data);
    makeToast("Successfully added post");
    setData(`content`, "");
    onClose();
  }

  const globals = { state, setData, handleAddPost };

  return (
    <MainContext.Provider value={globals}>{children}</MainContext.Provider>
  );

  function updateStateKey(key, value) {
    setState((prev) => {
      const newState = { ...prev };
      newState[key] = value;
      return newState;
    });
  }
}

async function fetchUser() {
  const res = await axios.get("/user/current");
  return res.data;
}
