import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import toasterContext from "../../contexts/ToasterContext";

export default function Main() {
  const history = useHistory();

  const { makeToast } = useContext(toasterContext);
  return (
    <div>
      <Button variant="solid" colorScheme="linkedin" onClick={logout}>
        Log out
      </Button>
    </div>
  );

  async function logout() {
    try {
      await axios.get("/auth/logout");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      history.push("/login");
    } catch (err) {
      makeToast(err.toString(), "error");
    }
  }
}
