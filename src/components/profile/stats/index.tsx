import { useSession } from "../../../auth";
import { Box, Heading } from "@chakra-ui/react";
import Stat from "./stat";
import worstenbroodje from "../../../assets/images/worstenbroodje.png";
import panini from "../../../assets/images/panini.png";
import pizza from "../../../assets/images/pizza.png";

const Stats = () => {
  const { user } = useSession();

  return (
    <Box px="1rem">
      <Heading my="1rem">Jouw statistieken</Heading>
      <Stat title="Worstenbroodjes" count={user.stats.worstenbroodjes} imageSrc={worstenbroodje} />
      <Stat title="Panini's" count={user.stats.paninis} imageSrc={panini} middle />
      <Stat title="Pizza's" count={user.stats.pizzas} imageSrc={pizza} />
    </Box>
  );
};

export default Stats;
