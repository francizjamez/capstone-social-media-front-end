import { ChakraProvider } from "@chakra-ui/react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <ChakraProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </ChakraProvider>
  );
}

export default App;
