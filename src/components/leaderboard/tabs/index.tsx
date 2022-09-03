import { useState, useCallback } from "react";
import { Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../../api/user";
import { User } from "../../../interfaces";
import LeaderboardRow from "../leaderboardRow";

const TabsMenu = () => {
  const [userList, setUserList] = useState<User[]>();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const { loading } = useQuery(GET_ALL_USERS, {
    onCompleted: data => {
      setUserList(data.getAllUsers);
    },
    onError: error => {
      // TODO: show toast
      console.log(error);
    },
  });

  const sortedBy = useCallback(
    (food: string) => {
      if (userList !== undefined) {
        switch (food) {
          case "worstenbroodje": {
            return [...userList].sort((a, b) => b.stats.worstenbroodjes - a.stats.worstenbroodjes);
          }
          case "panini": {
            return [...userList].sort((a, b) => b.stats.paninis - a.stats.paninis);
          }
          case "pizza": {
            return [...userList].sort((a, b) => b.stats.pizzas - a.stats.pizzas);
          }
          default: {
            //TODO: error handling or something
          }
        }
      }
    },
    [userList]
  );

  return (
    <Tabs variant="soft-rounded" onChange={index => setTabIndex(index)}>
      <TabList>
        <Tab>Worstenbroodjes</Tab>
        <Tab>Pizza's</Tab>
        <Tab>Panini's</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {sortedBy("worstenbroodje")?.map(user => (
            <LeaderboardRow key={user.id} id={user.id} username={user.username} stats={user.stats} />
          ))}
        </TabPanel>
        <TabPanel>
          {sortedBy("pizza")?.map(user => (
            <LeaderboardRow key={user.id} id={user.id} username={user.username} stats={user.stats} />
          ))}
        </TabPanel>
        <TabPanel>
          {sortedBy("panini")?.map(user => (
            <LeaderboardRow key={user.id} id={user.id} username={user.username} stats={user.stats} />
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsMenu;
