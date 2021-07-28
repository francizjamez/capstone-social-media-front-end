import { Box, Button, Link, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import toasterContext from "../../contexts/ToasterContext";
import useMainStore from "./MainStore";

export default function FollowerList() {
  const { isLoading, data } = useQuery("followList", fetchFollowList);

  if (isLoading) {
    return (
      <Box position="fixed" flex={1} right={6} top={5}>
        <p>...loading...</p>
      </Box>
    );
  }

  return (
    <Box
      position="fixed"
      flex={1}
      right={3}
      top="7rem"
      borderWidth="2px"
      p={4}
      borderColor="black"
      borderRadius="xl"
    >
      <VStack>
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
  const { user_name, followers } = data;
  const { makeToast } = useContext(toasterContext);
  const user = useMainStore((state) => state.user);
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    setIsFollowed(followers.includes(user._id));
    // eslint-disable-next-line
  }, [user]);

  return (
    <Box borderWidth="2px" w="10rem" p={3}>
      <VStack>
        <Link color="teal.500">@{user_name}</Link>
        <Text>Followers: {followers.length}</Text>
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
