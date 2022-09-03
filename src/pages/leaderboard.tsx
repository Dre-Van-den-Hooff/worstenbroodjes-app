import Page from "../components/page";
import { Heading } from "@chakra-ui/react";
import TabsMenu from "../components/leaderboard/tabs";

const Leaderboard = () => {
  return (
    <Page withFooter>
      <Heading>Leaderboard</Heading>
      <TabsMenu />
    </Page>
  );
};

export default Leaderboard;
