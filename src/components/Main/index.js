import { Box, Container } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import AddForm from "./AddForm";
import Feed from "./Feed";
import FollowSuggestions from "./FollowerList";
import { MainProvider } from "./MainContext";
import Nav from "./Nav";
import Profile from "./Profile";

export default function MainProvided() {
  return (
    <MainProvider>
      <Box height="100vh" mt={20}>
        <Nav />
        <Route path="/main/feed" component={Main} key={1} />
        <Route path="/main/profile/:id" exact component={Profile} />
      </Box>
    </MainProvider>
  );
}

function Main() {
  return (
    <>
      <Container p={4} maxW="7xl">
        <Feed />
        <FollowSuggestions />
      </Container>
      <AddForm />
    </>
  );
}
