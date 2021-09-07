import {
  Box,
  Button,
  Divider,
  Text,
  VStack,
  Link as ChakraLink,
  Icon,
  Image,
  Flex,
  Heading,
  Center,
  Spinner,
  IconButton,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import toasterContext from "../../contexts/ToasterContext";
import { useContext, useEffect, useState, memo } from "react";
import { AiOutlineUser, AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toggleReload } from "../../redux/mainSlice";

const Feed = memo(({ user = "me" }) => {
  const reloadState = useSelector((state) => state.main.reloadState);

  const { isLoading, isError, data } = useQuery(
    [`posts_${user || `feed`}`, reloadState],
    fetchPosts
  );

  if (isLoading)
    return (
      <Center height="100vh" width="100vw">
        <Spinner size="xl" thickness="6px" />
      </Center>
    );
  if (isError) return <h1>...Error...</h1>;

  return (
    <VStack flex={2} spacing={10} p={2}>
      {data.map((post) => (
        <Post data={post} key={Math.random()} />
      ))}
      {data.length === 0 && (
        <Heading textAlign="center" size="lg">
          {user !== "me"
            ? "Try posting something"
            : "No more posts to show, add a post or follow someone to start seeing posts"}
        </Heading>
      )}
    </VStack>
  );

  async function fetchPosts() {
    let url = "/post";
    if (user !== `me`) {
      url += `/${user}`;
    }

    const res = await axios.get(url);
    return res.data;
  }
});

const Post = memo(({ data }) => {
  const { content, author, likes: dataLikes, createdAt, _id } = data;
  const createdDate = new Date(createdAt);
  const dateString = createdDate.toLocaleDateString();
  const timeString = createdDate.toLocaleTimeString();
  const { user_name, display_picture, name } = author;

  const user = useSelector((state) => state.main.user);

  const dispatch = useDispatch();

  const { makeToast } = useContext(toasterContext);

  const [likes, setLikes] = useState(dataLikes.length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (user) setIsLiked(dataLikes.includes(user._id));
    // eslint-disable-next-line
  }, []);

  return (
    <Box borderWidth="2px" borderRadius="lg" width={["100%", "20em", "30em"]}>
      <Box py={4} px={8} bg="white">
        <Flex
          p={2}
          gridGap={3}
          justify={user_name === user.user_name && "space-between"}
        >
          <Flex gridGap={3}>
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
            <Flex flexDir="column" gridGap={3}>
              <Heading as="h3" size="md">
                {name}
              </Heading>
              <ChakraLink
                color="teal.500"
                as={Link}
                to={`/main/profile/${user_name}`}
              >
                @{user_name}
              </ChakraLink>
            </Flex>
          </Flex>

          {user_name === user.user_name && (
            <IconButton
              colorScheme="red"
              borderRadius="15px"
              aria-label="Search database"
              onClick={deletePost}
              icon={<AiOutlineDelete />}
            />
          )}
        </Flex>

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
        colorScheme={isLiked ? `orange` : `teal`}
        onClick={toggleLike}
      >
        {isLiked ? `UNLIKE` : `LIKE`}
      </Button>
    </Box>
  );

  async function deletePost(e) {
    try {
      const res = await axios.get(`/post/delete/${_id}`);
      makeToast(res.data);
      dispatch(toggleReload());
    } catch (err) {
      makeToast(err.toString(), "error");
    }
  }

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

export default Feed;
