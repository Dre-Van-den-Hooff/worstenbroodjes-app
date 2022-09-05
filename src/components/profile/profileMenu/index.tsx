import { Link as RouteLink } from "react-router-dom";
import { IconButton, Flex, Heading, Link } from "@chakra-ui/react";
import { MdOutlineLeaderboard } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { useLogout } from "../../../auth";

const ProfileMenu = () => {
  const logout = useLogout();

  return (
    <Flex justifyContent="space-between" w="100%" my="1rem">
      <Link as={RouteLink} to="/leaderboard">
        <IconButton aria-label="leaderboard-button" icon={<MdOutlineLeaderboard size="25px" />} variant="ghost" />
      </Link>
      <Heading>Profiel</Heading>
      <Link as={RouteLink} to="/login">
        <IconButton aria-label="logout-button" icon={<BiLogOut size="25px" />} variant="ghost" onClick={logout} />
      </Link>
    </Flex>
  );
};

export default ProfileMenu;
