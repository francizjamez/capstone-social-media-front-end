import { Box, Container } from "@chakra-ui/react";

import AddForm from "./AddForm";
import Feed from "./Feed";
import FollowSuggestions from "./FollowSuggestions";
import { MainProvider } from "./MainContext";
import Nav from "./Nav";

export default function MainProvided() {
  return (
    <MainProvider>
      <Main />
    </MainProvider>
  );
}

function Main() {
  return (
    <Box height="100vh" mt={20}>
      <Nav />
      <Container p={4} maxW="7xl">
        <Feed />
        <FollowSuggestions />
      </Container>

      <AddForm />
    </Box>
  );
}
