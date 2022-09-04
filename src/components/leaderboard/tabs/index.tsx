import { useState, useCallback } from "react";
import { Tabs, TabList, TabPanels, TabPanel, Tab, Flex, Avatar, Text } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../../api/user";
import { User } from "../../../interfaces";

import LeaderboardRow from "../leaderboardRow";
import LeaderboardHeading from "./leaderboardHeading";

const TabsMenu = () => {
  const [userList, setUserList] = useState<User[]>();
  const [food, setFood] = useState<string>("worstenbroodje");

  const { loading } = useQuery(GET_ALL_USERS, {
    onCompleted: data => {
      setUserList(data.getAllUsers);
    },
    onError: error => {
      // TODO: error handling: show toast
      console.log(error);
    },
  });

  const handleTabChange = useCallback((tabIndex: number) => {
    switch (tabIndex) {
      case 0:
        setFood("worstenbroodje");
        break;

      case 1:
        setFood("pizza");
        break;

      case 2:
        setFood("panini");
        break;
    }
  }, []);

  const getSortedBy = useCallback(
    (food: string) => {
      if (userList !== undefined) {
        switch (food) {
          case "worstenbroodje":
            return [...userList].sort((a, b) => b.stats.worstenbroodjes - a.stats.worstenbroodjes);

          case "panini":
            return [...userList].sort((a, b) => b.stats.paninis - a.stats.paninis);

          case "pizza":
            return [...userList].sort((a, b) => b.stats.pizzas - a.stats.pizzas);

          default: {
            //TODO: error handling or something
          }
        }
      } else {
        // TODO: error handling when userList is undefined
      }
    },
    [userList]
  );

  const getTopThree = useCallback(
    (food: string) => {
      return getSortedBy(food)?.filter((user, index) => index <= 2 ?? user);
    },
    [getSortedBy]
  );

  return (
    <Tabs variant="soft-rounded" onChange={index => handleTabChange(index)} isFitted>
      <Flex
        borderBottomRadius="1rem"
        bgColor="blue.200"
        pb="10rem"
        px="1rem"
        alignItems="center"
        flexDirection="column">
        <LeaderboardHeading />
        <TabList w="100%" bgColor="gray.500" borderRadius="1.2rem">
          <Tab color="white">Worstenbroodjes</Tab>
          <Tab color="white">Pizza's</Tab>
          <Tab color="white">Panini's</Tab>
        </TabList>
        <Flex mt="5rem" justifyContent="space-between" w="100%">
          {getTopThree(food)?.map(user => (
            <Flex key={user.id} maxW="100px" alignItems="center" flexDirection="column">
              <Avatar name={user.username} />
              <Text textAlign="center">{user.username}</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
      <TabPanels>
        <TabPanel>
          {getSortedBy("worstenbroodje")?.map((user, index) => (
            <LeaderboardRow
              key={user.id}
              id={user.id}
              username={user.username}
              amount={user.stats.worstenbroodjes}
              rank={index}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {getSortedBy("pizza")?.map((user, index) => (
            <LeaderboardRow
              key={user.id}
              id={user.id}
              username={user.username}
              amount={user.stats.pizzas}
              rank={index}
            />
          ))}
        </TabPanel>
        <TabPanel>
          {getSortedBy("panini")?.map((user, index) => (
            <LeaderboardRow
              key={user.id}
              id={user.id}
              username={user.username}
              amount={user.stats.paninis}
              rank={index}
            />
          ))}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsMenu;
