import { Link } from "react-router-dom";

import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";

export default function Login() {
  const [show, setShow] = useState(false);
  return (
    <Center height="100vh" flexDir="column" gridGap={2}>
      <Heading as="h1" size="2xl" isTruncated>
        Devlok
      </Heading>
      <form>
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
            <Input type="string" placeholder="Username" />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineLock color="gray.300" />}
            />
            <Input type={show ? "text" : "password"} placeholder="Password" />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShow(!show)}
                variant="ghost"
              >
                {show ? (
                  <AiOutlineEye color="black" />
                ) : (
                  <AiOutlineEyeInvisible color="black" />
                )}
              </Button>
            </InputRightElement>
          </InputGroup>
          <Button type="submit" colorScheme="linkedin">
            Submit
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
}
