import { LeaderboardRowProps } from "../../interfaces";
import { Flex, Text, Center, Avatar } from "@chakra-ui/react";
import leaderboardbg from "../../assets/images/leaderboardbg.png";

const LeaderboardRow = ({ id, username, amount, rank }: LeaderboardRowProps) => {
  return (
    <Center p="0.5rem">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        maxW="95%"
        w="100%"
        bgImage={leaderboardbg}
        p="0.5rem"
        borderRadius="1rem">
        <Flex alignItems="center">
          <Text mr="20%" fontWeight="bold">
            {rank + 1}
          </Text>
          <Avatar name={username} />
        </Flex>
        <Text>{username}</Text>
        <Text fontWeight="bold">{amount}</Text>
      </Flex>
    </Center>
  );
};

export default LeaderboardRow;
