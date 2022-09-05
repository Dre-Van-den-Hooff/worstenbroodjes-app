import Page from "../components/page";
import TabsMenu from "../components/leaderboard/tabs";
import { SlideFade } from "@chakra-ui/react";

const Leaderboard = () => {
  return (
    <SlideFade in offsetY="-200px">
      <Page withFooter>
        <TabsMenu />
      </Page>
    </SlideFade>
  );
};

export default Leaderboard;
