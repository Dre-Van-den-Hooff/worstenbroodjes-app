import Page from "../components/page";
import { useSession } from "../auth";
import { Text } from "@chakra-ui/react";

const Profile = () => {
  const { user } = useSession();

  return (
    <Page withFooter>
      <p>profile page</p>
      {user && <Text>Welkom {user.username}</Text>}
    </Page>
  );
};

export default Profile;
