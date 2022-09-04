import { Heading, Flex, IconButton, Link } from "@chakra-ui/react";
import { MdOutlineAccountCircle, MdAddShoppingCart } from "react-icons/md";
import { Link as RouteLink } from "react-router-dom";
import AddFoodDrawer from "../addFoodDrawer";

const LeaderboardHeading = () => {
  return (
    <Flex alignItems="center" justifyContent="space-between" w="100%">
      <IconButton aria-label="logout-button" icon={<MdAddShoppingCart size="25px" />} bgColor="transparent" />
      <Heading my="1rem">Leaderboard</Heading>
      <Link as={RouteLink} to="/profile">
        <IconButton aria-label="profile-button" icon={<MdOutlineAccountCircle size="25px" />} bgColor="transparent" />
      </Link>
    </Flex>
  );
};

export default LeaderboardHeading;
