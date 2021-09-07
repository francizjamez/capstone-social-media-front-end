import {
  Box,
  Button,
  Link as ChakraLink,
  Text,
  VStack,
  HStack,
  Image,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import toasterContext from "../../contexts/ToasterContext";
import { useSelector } from "react-redux";

export default function FollowerList() {
  const { isLoading, data } = useQuery("followList", fetchFollowList);
  const showFollowers = useSelector((state) => state.main.showFollowers);

  if (isLoading) {
    return (
      <Box position="fixed" flex={1} right={6} top={5}>
        <p>...loading...</p>
      </Box>
    );
  }

  return (
    <Box
      zIndex={2}
      height="100%"
      transition="all 200ms ease-in-out"
      position={["absolute", "absolute", "static"]}
      top={0}
      left={showFollowers ? "0px" : "100vw"}
      width={["100vw", "100vw", "auto"]}
      backgroundColor={["white", "white", "transparent"]}
      p={8}
      alignSelf="start"
    >
      <VStack gridGap={2}>
        {data.map((user, i) => (
          <User data={user} key={i} />
        ))}
      </VStack>

      {data.length === 0 && <Text>No more users to follow</Text>}
    </Box>
  );

  async function fetchFollowList() {
    const res = await axios.get("user/follow-suggestions");
    return res.data;
  }
}

function User({ data }) {
  const { user_name, followers, display_picture } = data;
  const { makeToast } = useContext(toasterContext);
  const user = useSelector((state) => state.main.user);

  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    setIsFollowed(followers.includes(user._id));
    // eslint-disable-next-line
  }, [user]);

  return (
    <Box
      minW="300px"
      boxShadow="md"
      borderRadius={10}
      backgroundColor="gray.50"
      borderBottom="2px"
      borderColor="gray.300"
      w="10rem"
      py={6}
    >
      <VStack gridGap={4}>
        <HStack>
          {display_picture ? (
            <Image
              src={display_picture}
              boxSize="5rem"
              objectFit="cover"
              borderRadius="full"
              borderWidth="2px"
              borderColor="black"
            />
          ) : (
            <Icon as={AiOutlineUser} w="5rem" h="5rem" />
          )}
          <VStack gridGap={0}>
            <ChakraLink
              color="teal.500"
              as={Link}
              to={`/main/profile/${user_name}`}
            >
              @{user_name}
            </ChakraLink>
            <Text color="gray.500">Followers: {followers.length}</Text>
          </VStack>
        </HStack>

        <Button
          colorScheme={isFollowed ? `red` : `linkedin`}
          onClick={followUser}
        >
          {isFollowed ? `UNFOLLOW` : `FOLLOW`}
        </Button>
      </VStack>
    </Box>
  );

  async function followUser() {
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
}
