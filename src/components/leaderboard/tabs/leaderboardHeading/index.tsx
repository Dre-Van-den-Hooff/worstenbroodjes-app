import { useRef } from "react";
import { Heading, Flex, IconButton, Link, useDisclosure } from "@chakra-ui/react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link as RouteLink } from "react-router-dom";
import FoodDrawer from "../foodDrawer";

const LeaderboardHeading = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>();
  return (
    <Flex alignItems="center" justifyContent="space-between" w="100%">
      <FoodDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} btnRef={btnRef} />
      <Heading my="1rem">Leaderboard</Heading>
      <Link as={RouteLink} to="/profile">
        <IconButton aria-label="profile-button" icon={<MdOutlineAccountCircle size="25px" />} bgColor="transparent" />
      </Link>
    </Flex>
  );
};

export default LeaderboardHeading;
