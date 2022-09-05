import React from "react";
import { useSession } from "../../../auth";
import { Text, Box } from "@chakra-ui/react";

const Stats = () => {
  const { user } = useSession();

  return (
    <>
      {user && (
        <Box>
          <Text>Worstenbroodjes: {user.stats.worstenbroodjes}</Text>
          <Text>Pizza's: {user.stats.pizzas}</Text>
          <Text>Panini's: {user.stats.paninis}</Text>
        </Box>
      )}
    </>
  );
};

export default Stats;
