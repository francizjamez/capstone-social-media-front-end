import {
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Compressor from "compressorjs";
import { useReducer } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import {
  changeData,
  handleSubmit,
  initState,
  reducer,
  SET_SHOW_PASSWORD,
} from "./reducer";

const labelStyle = {
  background: "tomato",
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  color: "white",
  cursor: "pointer",
};

export default function SignUp() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { showPassword, isLoading } = state;
  const history = useHistory();
  const toast = useToast();

  const imgSrc = state.data.display_picture || "";

  const handleCompressedUpload = (e) => {
    const image = e.target.files[0];
    new Compressor(image, {
      quality: 0.7,
      maxWidth: 300,
      maxHeight: 300,
      success: (compressedResult) => {
        console.log(compressedResult.size);
        getBase64(compressedResult, (result) => {
          dispatch(changeData("display_picture", result, state));
        });
      },
    });
  };

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  return (
    <Center height="100vh">
      <VStack>
        <Heading as="h2" size="2xl">
          Devlok
        </Heading>
        <form
          onSubmit={(e) => handleSubmit(e, state, history, toast, dispatch)}
        >
          <Flex
            direction="column"
            gridGap={2}
            bg="white"
            borderWidth="2px"
            p={10}
            color="black"
          >
            <Heading as="h2" size="lg">
              Sign up
            </Heading>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AiOutlineUser color="gray.300" />}
              />
              <Input
                type="string"
                placeholder="Name"
                onChange={(e) => {
                  dispatch(changeData("name", e.target.value, state));
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AiOutlineUser color="gray.300" />}
              />
              <Input
                type="string"
                placeholder="Username"
                onChange={(e) => {
                  dispatch(changeData("user_name", e.target.value, state));
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AiOutlineMail color="gray.300" />}
              />
              <Input
                type="string"
                placeholder="Email"
                onChange={(e) =>
                  dispatch(changeData("email", e.target.value, state))
                }
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AiOutlineLock color="gray.300" />}
              />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => {
                  dispatch(changeData("password", e.target.value, state));
                }}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() =>
                    dispatch({
                      type: SET_SHOW_PASSWORD,
                      payload: !showPassword,
                    })
                  }
                  variant="ghost"
                >
                  {true ? (
                    <AiOutlineEye color="black" />
                  ) : (
                    <AiOutlineEyeInvisible color="black" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Center>
              <label for="file-upload" style={labelStyle}>
                UPLOAD IMAGE
              </label>
            </Center>
            <Image
              src={imgSrc}
              boxSize="150px"
              objectFit="cover"
              borderRadius="full"
              alignSelf="center"
            />

            <Input
              display="none"
              type="file"
              id="file-upload"
              onChange={handleCompressedUpload}
            />
            <Button
              type="submit"
              colorScheme="linkedin"
              loadingText="Signing up"
              isLoading={isLoading}
            >
              Sign up
            </Button>
          </Flex>
        </form>
        <Link to="/login">
          <Button variant="link" colorScheme="linkedin">
            Already have an account? Log in here.
          </Button>
        </Link>
      </VStack>
    </Center>
  );
}
