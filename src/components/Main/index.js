import { Box, Container } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import AddForm from "./AddForm";
import Feed from "./Feed";
import FollowSuggestions from "./FollowerList";
import Nav from "./Nav";
import Profile from "./Profile";
import { memo, useContext, useEffect } from "react";
import useMainStore from "./MainStore";
import axios from "axios";
import { useQuery } from "react-query";
import toasterContext from "../../contexts/ToasterContext";

export default function Main() {
  return (
    <Box height="100vh" mt={20}>
      <Nav />
      <Route path="/main/feed" component={MainFeed} key={1} />
      <Route path="/main/profile/:id" exact component={Profile} />
    </Box>
  );
}

const MainFeed = memo(function Main() {
  const setUser = useMainStore((state) => state.setUser);
  const { data, isError, err } = useQuery("user", fetchUser);
  const { makeToast } = useContext(toasterContext);

  useEffect(() => {
    if (data) setUser(data);
  }, [data, setUser]);

  if (isError) makeToast(err.toString() || `refetching`, `error`);

  return (
    <>
      <Container p={4} maxW="7xl">
        <Feed />
        <FollowSuggestions />
      </Container>
      <AddForm />
    </>
  );
});

async function fetchUser() {
  console.log(`fetching user`);
  const res = await axios.get("/user/current");
  return res.data;
}
