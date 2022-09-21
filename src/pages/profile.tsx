import Page from "../components/page";
import { SlideFade } from "@chakra-ui/react";
import ProfileHeading from "../components/profile/profileHeading";
import Stats from "../components/profile/stats";
import UpdateUsername from "../components/profile/updateUsername";
import { useSession } from "../auth";

const Profile = () => {
  const { user } = useSession();

  return (
    <SlideFade in offsetY="-200px">
      <Page>
        <ProfileHeading />
        {user && (
          <>
            <Stats />
            <UpdateUsername />
          </>
        )}
      </Page>
    </SlideFade>
  );
};

export default Profile;
