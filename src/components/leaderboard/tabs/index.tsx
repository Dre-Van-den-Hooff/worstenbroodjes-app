import { useState, useCallback, useEffect } from "react";
import { Tabs, TabList, TabPanels, TabPanel, Tab, Flex, Text, useToast, Image } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../../api/user";
import { User } from "../../../interfaces";
import background from "../../../assets/images/bg4.png";
import gold from "../../../assets/images/gold.png";
import silver from "../../../assets/images/silver.png";
import bronze from "../../../assets/images/bronze.png";
import LeaderboardRow from "../leaderboardRow";
import LeaderboardHeading from "./leaderboardHeading";

const TabsMenu = () => {
  const [userList, setUserList] = useState<User[]>();
  const [food, setFood] = useState<string>("worstenbroodje");

  const toast = useToast();

  const { refetch } = useQuery(GET_ALL_USERS, {
    onCompleted: data => {
      setUserList(data.getAllUsers);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Er ging iets mis bij het ophalen van de leaderboards.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
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
            toast({
              title: "Error",
              description: "Er ging iets mis. Probeer te refreshen.",
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          }
        }
      }
    },
    [userList, toast]
  );

  const getTopThree = useCallback(
    (food: string) => {
      return getSortedBy(food)?.filter((user, index) => index <= 2 ?? user);
    },
    [getSortedBy]
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Tabs variant="soft-rounded" onChange={index => handleTabChange(index)} isFitted>
      <Flex
        borderBottomRadius="2rem"
        bgImage={background}
        pb="6rem"
        px="1rem"
        alignItems="center"
        flexDirection="column">
        <LeaderboardHeading refetchUsers={refetch} />
        <TabList w="100%" bgColor="gray.500" borderRadius="1.2rem" mt="1rem">
          <Tab color="white">Worstenbroodjes</Tab>
          <Tab color="white">Pizza's</Tab>
          <Tab color="white">Panini's</Tab>
        </TabList>
        <Flex mt="5rem" justifyContent="space-between" w="100%">
          {getTopThree(food)?.map((user, index) => (
            <Flex key={user.id} maxW="100px" minW="70px" alignItems="center" flexDirection="column">
              {index === 0 && <Image src={gold} alt="gold-medal" w="80px" mb="0.2rem" />}
              {index === 1 && <Image src={silver} alt="silver-medal" w="80px" mb="0.2rem" />}
              {index === 2 && <Image src={bronze} alt="bronze-medal" w="80px" mb="0.2rem" />}
              <Text textAlign="center" fontWeight="bold">
                {user.username}
              </Text>
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
