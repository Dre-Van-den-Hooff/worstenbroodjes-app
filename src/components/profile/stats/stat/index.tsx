import { StatProps } from "../../../../interfaces";
import { Text, Flex, Image } from "@chakra-ui/react";

const Stat = ({ count, middle, imageSrc }: StatProps) => {
  return (
    <Flex flexDirection="column" alignItems="center" borderY={middle ? "1px solid black" : "none"} py="1.2rem">
      <Image alt="food-picture" src={imageSrc} w="100px" />
      <Text fontSize="1.5rem">{count}</Text>
    </Flex>
  );
};

export default Stat;
