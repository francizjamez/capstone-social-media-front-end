import {
  Box,
  Button,
  Divider,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import toasterContext from "../../contexts/ToasterContext";
import { useContext, useEffect, useState, memo } from "react";
import MainContext from "./MainContext";

export default function Feed({ user }) {
  const { isLoading, isError, data } = useQuery(
    `posts_${user || `feed`}`,
    fetchPosts
  );

  if (isLoading) return <h1>...Loading...</h1>;
  if (isError) return <h1>...Error...</h1>;

  return (
    <VStack flex={2} spacing={10} p={2}>
      {data.map((post) => (
        <Post data={post} key={Math.random()} />
      ))}
    </VStack>
  );

  async function fetchPosts() {
    console.log(`fetching posts`);
    let url = "/post";
    if (user) {
      url += `/${user}`;
    }
    const res = await axios.get(url);
    return res.data;
  }
}

const Post = memo(({ data }) => {
  const { content, author, likes: dataLikes, createdAt, _id } = data;
  const [likes, setLikes] = useState(dataLikes.length);
  const [isLiked, setIsLiked] = useState(false);
  const createdDate = new Date(createdAt);
  const dateString = createdDate.toLocaleDateString();
  const timeString = createdDate.toLocaleTimeString();
  const { user_name } = author;
  const { makeToast } = useContext(toasterContext);
  const { state } = useContext(MainContext);

  useEffect(() => {
    console.log(state.user);
    if (state.user) setIsLiked(dataLikes.includes(state.user._id));
    // eslint-disable-next-line
  }, []);

  return (
    <Box borderWidth="2px" borderRadius="lg" width={["100%", "20em", "30em"]}>
      <Box py={4} px={8} bg="white">
        <ChakraLink
          color="teal.500"
          as={Link}
          to={`/main/profile/${user_name}`}
        >
          @{user_name}
        </ChakraLink>
        <Divider borderWidth="1px" borderColor="black" />
        <Text my={4}>{content}</Text>
        <Text color="gray.600">
          Posted at {dateString} {timeString}
        </Text>
        <Text color="gray.600">Likes: {likes}</Text>
      </Box>
      <Divider />
      <Button
        isFullWidth
        borderTopRadius={0}
        colorScheme={isLiked ? `red` : `teal`}
        onClick={toggleLike}
      >
        {isLiked ? `UNLIKE` : `LIKE`}
      </Button>
    </Box>
  );

  async function toggleLike() {
    try {
      let res = "";
      if (isLiked) {
        res = await axios.get(`/post/unlike/${_id}`);
        setLikes(likes - 1);
        setIsLiked(false);
      } else {
        res = await axios.get(`/post/like/${_id}`);
        setLikes(likes + 1);
        setIsLiked(true);
      }
      makeToast(res.data);
    } catch (err) {
      makeToast(err.toString(), "error");
    }
  }
});
