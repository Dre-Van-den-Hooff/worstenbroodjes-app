import Page from "../components/page";
import { SlideFade } from "@chakra-ui/react";
import ProfileHeading from "../components/profile/profileHeading";
import Stats from "../components/profile/stats";

const Profile = () => {
  return (
    <SlideFade in offsetY="-200px">
      <Page withFooter>
        <ProfileHeading />
        <Stats />
      </Page>
    </SlideFade>
  );
};

export default Profile;
