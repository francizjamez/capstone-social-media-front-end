import axios from "axios";
import toasterContext from "../../contexts/ToasterContext";
import { useContext } from "react";
import { useQueryClient } from "react-query";
import { AiOutlineUser } from "react-icons/ai";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Nav() {
  const { makeToast } = useContext(toasterContext);
  const user = useSelector((state) => state.main.user);

  const history = useHistory();
  const queryClient = useQueryClient();

  const { display_picture, user_name } = user;
  return (
    <Flex
      position="fixed"
      w="100vw"
      alignItems="center"
      justify="space-between"
      px={[2, 12, 20]}
      py={2}
      top={0}
      left={0}
      zIndex={100}
      borderBottom="3px solid black"
      bg="gray.50"
    >
      <HStack>
        <Flex
          flexDirection={["column", "column", "row"]}
          alignItems="center"
          gridGap={2}
        >
          {display_picture ? (
            <Image
              src={display_picture}
              boxSize="70px"
              objectFit="cover"
              borderRadius="full"
              borderWidth="2px"
              borderColor="black"
            />
          ) : (
            <Icon as={AiOutlineUser} w="70px" h="70px" />
          )}
          <Text>{user_name}</Text>
        </Flex>
      </HStack>
      <ChakraLink to="/main/feed" color="teal.500" as={Link}>
        <Heading as="h1" fontSize={["24px", "32px", "40px"]}>
          Home
        </Heading>
      </ChakraLink>

      <Flex gridGap={2} flexDirection={["column", "row"]} alignItems="center">
        <Link to={`/main/profile/${user_name}`}>
          <Button colorScheme="linkedin" isLoading={!user._id}>
            Profile
          </Button>
        </Link>
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
      queryClient.clear();
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
