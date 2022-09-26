import Page from "../components/page";
import { SlideFade, Image, Center } from "@chakra-ui/react";
import ProfileHeading from "../components/profile/profileHeading";
import Stats from "../components/profile/stats";
import UpdateUsername from "../components/profile/updateUsername";
import { useSession } from "../auth";
import meow from "../assets/gifs/cat-meow.gif";

const Profile = () => {
  const { user } = useSession();

  return (
    <SlideFade in offsetY="-200px">
      <Page>
        <ProfileHeading />
        {user ? (
          <>
            <Stats />
            <UpdateUsername />
          </>
        ) : (
          <Center my="2rem">
            <Image src={meow} alt="cat-meow-gif" borderRadius="1rem" />
          </Center>
        )}
      </Page>
    </SlideFade>
  );
};

export default Profile;
