import { LeaderboardRowProps } from "../../interfaces";
import { Flex, Text, Center } from "@chakra-ui/react";

const LeaderboardRow = ({ id, username, stats }: LeaderboardRowProps) => {
  return (
    <Center p="0.5rem">
      <Flex justifyContent="space-between" maxW="60%" w="100%" bgColor="teal.200" p="0.5rem" borderRadius="1rem">
        <Text>{username}</Text>
        <Text>{stats.worstenbroodjes}</Text>
      </Flex>
    </Center>
  );
};

export default LeaderboardRow;
