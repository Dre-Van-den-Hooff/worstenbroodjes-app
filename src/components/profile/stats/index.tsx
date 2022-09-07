import { useSession } from "../../../auth";
import { Text, Box, Heading } from "@chakra-ui/react";

const Stats = () => {
  const { user } = useSession();

  return (
    <>
      {user && (
        <Box px="1rem">
          <Heading>Jouw statistieken</Heading>
          <Text>Worstenbroodjes: {user.stats.worstenbroodjes}</Text>
          <Text>Pizza's: {user.stats.pizzas}</Text>
          <Text>Panini's: {user.stats.paninis}</Text>
        </Box>
      )}
    </>
  );
};

export default Stats;
