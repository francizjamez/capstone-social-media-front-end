import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import { ToasterProvider } from "./contexts/ToasterContext";

function App() {
  const history = useHistory();
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      history.push("/main");
    } else {
      history.push("/login");
    }
  });

  return (
    <ChakraProvider>
      <ToasterProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/main" component={Main} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </ToasterProvider>
    </ChakraProvider>
  );
}

export default App;
