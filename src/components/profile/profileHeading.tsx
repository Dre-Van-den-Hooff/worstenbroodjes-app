import { Flex, Box, Avatar, Text } from "@chakra-ui/react";
import { useSession } from "../../auth";
import ProfileMenu from "./profileMenu";
import NotLoggedInAlert from "../alert";

const ProfileHeading = () => {
  const { user } = useSession();

  return (
    <Flex borderBottomRadius="2rem" bgColor="blue.200" pb="3rem" px="1rem" alignItems="center" flexDirection="column">
      <ProfileMenu />
      {!user ? (
        <NotLoggedInAlert mt="2rem" mb="1rem" />
      ) : (
        <Box mt="2rem">
          <Avatar name={user.username} />
          <Text>{user.username}</Text>
        </Box>
      )}
    </Flex>
  );
};

export default ProfileHeading;
