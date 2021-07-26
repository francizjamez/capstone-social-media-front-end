import axios from "axios";
import toasterContext from "../../contexts/ToasterContext";
import { useContext } from "react";
import { Button, Flex, Heading, HStack, Image, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import MainContext from "./MainContext";

export default function Nav() {
  const { makeToast } = useContext(toasterContext);
  const { state } = useContext(MainContext);
  const history = useHistory();

  const { display_picture, user_name } = state.user || {};
  return (
    <Flex
      position="fixed"
      w="100vw"
      alignItems="center"
      justify="space-between"
      px={6}
      py={2}
      top={0}
      left={0}
      zIndex={100}
      borderBottom="3px solid black"
      bg="gray.50"
    >
      <HStack>
        <Image
          src={display_picture}
          boxSize="70px"
          objectFit="cover"
          borderRadius="full"
        ></Image>
        <Text>{user_name}</Text>
      </HStack>
      <Heading>Devlok</Heading>
      <Flex gridGap={2}>
        <Button colorScheme="linkedin">Profile</Button>
        <Button
          borderWidth={2}
          borderColor="black"
          variant="outline"
          onClick={logout}
        >
          Log out
        </Button>
      </Flex>
    </Flex>
  );

  async function logout() {
    try {
      await axios.get("/auth/logout");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      history.push("/login");
    } catch (err) {
      if (err.response.data) {
        makeToast(err.response.data, "error");
      } else {
        makeToast(err.toString(), "error");
      }
    }
  }
}
