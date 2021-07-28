import { useQuery } from "react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import Feed from "./Feed";

import { AiOutlineUser } from "react-icons/ai";
import toasterContext from "../../contexts/ToasterContext";
import useMainStore from "./MainStore";

export default function Profile() {
  const { id } = useParams();

  const { isLoading, data } = useQuery(`user_profile_${id}`, fetchUser);

  const user = useMainStore((state) => state.user);
  const { makeToast } = useContext(toasterContext);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    if (data) {
      const isFollowedObj = followers.find((u) => u._id === user._id);
      if (isFollowedObj) setIsFollowed(true);
      else setIsFollowed(false);
    }
    // eslint-disable-next-line
  }, [isLoading]);

  const { user_name: current_user_name } = user;

  if (isLoading)
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );

  let resData = {};

  if (data) {
    resData = { ...data };
  }

  const { user_name, display_picture, _id, followers, following } = resData;

  return (
    <Container maxW="3xl" bg="gray.100">
      <Center p={6}>
        <VStack spacing={3}>
          <Heading as="h1" size="xl" color="teal.500">
            @{user_name}
          </Heading>

          {display_picture ? (
            <Image
              src={display_picture}
              boxSize="10rem"
              objectFit="cover"
              borderRadius="full"
              borderWidth="2px"
              borderColor="black"
            />
          ) : (
            <Icon as={AiOutlineUser} w={24} h={24} />
          )}

          <HStack>
            <Text>Followers: {followers.length}</Text>
            <Text>Following: {following.length}</Text>
          </HStack>
          {id !== current_user_name && (
            <Button
              colorScheme={isFollowed ? `red` : `linkedin`}
              onClick={toggleUser}
            >
              {isFollowed ? `UNFOLLOW` : `FOLLOW`}
            </Button>
          )}
        </VStack>
      </Center>
      <Divider borderWidth={2} borderColor="teal.800" />
      <Feed user={_id} key={2} />
    </Container>
  );

  async function toggleUser() {
    try {
      let res = "";
      if (!isFollowed) {
        res = await axios.get(`user/follow/${user_name}`);
      } else {
        res = await axios.get(`user/unfollow/${user_name}`);
      }
      makeToast(`${res.data} ${user_name}`);
      setIsFollowed(!isFollowed);
    } catch (err) {
      makeToast(err.toString(), "error");
    }
  }

  async function fetchUser() {
    let userID = id;
    if (id === `me`) {
      userID = user._id;
    }
    const res = await axios.get(`/user/${userID}`);
    return res.data;
  }
}
