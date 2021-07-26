import { Box, Button, Link, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useQuery } from "react-query";

export default function FollowSuggestions() {
  const { isLoading, data } = useQuery(
    "followSuggestions",
    fetchFollowSuggestions
  );

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
        {data.map((user) => (
          <User data={user} />
        ))}
      </VStack>
    </Box>
  );
}

function User({ data }) {
  const { user_name } = data;

  return (
    <Box borderWidth="2px" w="10rem" p={3}>
      <VStack>
        <Link color="teal.500">@{user_name}</Link>
        <Button colorScheme="linkedin">Follow</Button>
      </VStack>
    </Box>
  );
}

async function fetchFollowSuggestions() {
  const res = await axios.get("user/follow-suggestions");
  return res.data;
}
