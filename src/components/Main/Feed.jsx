import { Box, Button, Divider, Link, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";

export default function Feed() {
  const { isLoading, isError, data } = useQuery("posts", fetchPosts);

  if (isLoading) return <h1>...Loading...</h1>;
  if (isError) return <h1>...Error...</h1>;

  return (
    <VStack flex={2}>
      {data.map((post, i) => (
        <Post data={post} key={i} />
      ))}
    </VStack>
  );
}

function Post({ data }) {
  const { content, author, likes, createdAt } = data;
  const createdDate = new Date(createdAt);
  const dateString = createdDate.toLocaleDateString();
  const timeString = createdDate.toLocaleTimeString();
  const { user_name } = author;
  return (
    <Box borderWidth="2px" borderRadius="lg" width={["100%", "20em", "30em"]}>
      <Box py={4} px={8}>
        <Link color="teal.500">@{user_name}</Link>
        <Divider borderWidth="1px" borderColor="black" />
        <Text my={4}>{content}</Text>
        <Text color="gray.600">
          Posted at {dateString} {timeString}
        </Text>
        <Text color="gray.600">Likes: {likes.length}</Text>
      </Box>
      <Divider />
      <Button isFullWidth borderTopRadius={0}>
        Like
      </Button>
    </Box>
  );
}

async function fetchPosts() {
  const res = await axios.get("/post");
  return res.data;
}
