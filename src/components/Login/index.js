import { Link, useHistory } from "react-router-dom";

import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useContext } from "react";

import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import useLoginStore from "./LoginStore";
import axios from "axios";
import toasterContext from "../../contexts/ToasterContext";

export default function Login() {
  const history = useHistory();
  const { makeToast } = useContext(toasterContext);
  const { isLoading, isShowing, setData, setShowing, setLoading, data } =
    useLoginStore((state) => state);

  return (
    <Center height="100vh" flexDir="column" gridGap={2}>
      <Heading as="h1" size="2xl" isTruncated>
        Devlok
      </Heading>
      <form onSubmit={handleSubmit}>
        <Flex
          direction="column"
          gridGap={2}
          bg="white"
          borderWidth="2px"
          p={10}
          color="black"
        >
          <Heading as="h2" size="lg" isTruncated>
            Login
          </Heading>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineUser color="gray.300" />}
            />
            <Input
              type="string"
              placeholder="Username"
              onChange={(e) => setData("user_name", e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineLock color="gray.300" />}
            />
            <Input
              type={isShowing ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setData("password", e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowing(!isShowing)}
                variant="ghost"
              >
                {isShowing ? (
                  <AiOutlineEye color="black" />
                ) : (
                  <AiOutlineEyeInvisible color="black" />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button
            type="submit"
            colorScheme="linkedin"
            loadingText="Logging in"
            isLoading={isLoading}
          >
            Log in
          </Button>
        </Flex>
      </form>
      <Link to="/signup">
        <Button variant="link" colorScheme="linkedin">
          Don't have an account? Sign up here.
        </Button>
      </Link>
    </Center>
  );

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", data);
      const { access_token, refresh_token } = res.data;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      history.push("/main/feed");
    } catch (err) {
      if (err.response) makeToast(err.response.data, "error");
      else {
        makeToast(err.toString(), "error");
      }
    }
    setLoading(false);
  }
}
