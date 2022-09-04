import { LeaderboardRowProps } from "../../interfaces";
import { Flex, Text, Center, Avatar } from "@chakra-ui/react";

const LeaderboardRow = ({ id, username, amount, rank }: LeaderboardRowProps) => {
  return (
    <Center p="0.5rem">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        maxW="90%"
        w="100%"
        bgColor="teal.200"
        p="0.5rem"
        borderRadius="1rem">
        <Flex alignItems="center">
          <Text mr="20%">{rank + 1}</Text>
          <Avatar name={username} />
        </Flex>
        <Text>{username}</Text>
        <Text>{amount}</Text>
      </Flex>
    </Center>
  );
};

export default LeaderboardRow;
