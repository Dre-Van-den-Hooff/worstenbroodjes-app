import { useEffect, useState, useCallback } from "react";
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

  const getSortedRanking = useCallback(() => {
    console.log("IN RANKS");
    if (userList !== undefined) {
      console.log("IN SWITCH");
      switch (tabIndex) {
        case 0: {
          const sorted = userList.sort((a, b) => b.stats.worstenbroodjes - a.stats.worstenbroodjes);
          setUserList([...sorted]);
          break;
        }
        case 1: {
          const sorted = userList.sort((a, b) => b.stats.pizzas - a.stats.pizzas);
          setUserList([...sorted]);
          break;
        }
        case 3: {
          const sorted = userList.sort((a, b) => b.stats.paninis - a.stats.paninis);
          setUserList([...sorted]);
          break;
        }
        default: {
          //TODO: Error handling
        }
      }
    } else {
      //TODO: Error handling
    }
  }, [userList, tabIndex]);

  useEffect(() => {
    console.log("first");
    getSortedRanking();
  }, [getSortedRanking, userList]);

  return (
    <Tabs variant="soft-rounded" onChange={index => setTabIndex(index)}>
      <TabList>
        <Tab>worstenbroodjes</Tab>
        <Tab>pizzas</Tab>
        <Tab>paninis</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          {userList?.map(user => (
            <LeaderboardRow key={user.id} id={user.id} username={user.username} stats={user.stats} />
          ))}
        </TabPanel>
        <TabPanel>
          {userList?.map(user => (
            <LeaderboardRow key={user.id} id={user.id} username={user.username} stats={user.stats} />
          ))}
        </TabPanel>
        <TabPanel>
          {userList?.map(user => (
            <LeaderboardRow key={user.id} id={user.id} username={user.username} stats={user.stats} />
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsMenu;
