import { useState } from "react";
import Page from "../components/page";
import { useQuery } from "@apollo/client";
import { Heading } from "@chakra-ui/react";
import { GET_ALL_USERS } from "../api/user";
import TabsMenu from "../components/leaderboard/tabs";
import LeaderboardRow from "../components/leaderboard/leaderboardRow";
import { User } from "../interfaces";

const Leaderboard = () => {
  return (
    <Page withFooter>
      <Heading>Leaderboard</Heading>
      <TabsMenu />
    </Page>
  );
};

export default Leaderboard;
