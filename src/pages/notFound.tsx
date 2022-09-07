import { Box, Heading, Code, Button, Center } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Link as RouteLink } from "react-router-dom";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <Center height="70vh" flexDirection="column" px="1.5rem">
      <Box>
        <Heading>404: Page not found {":("}</Heading>
        <Code my={5} colorScheme="red" fontSize="1.5em">
          Page with url {pathname} was not found
        </Code>
      </Box>
      <Box>
        <Button as={RouteLink} to="/leaderboard" my={2} size="lg" backgroundColor="teal.200">
          Go to leaderboards
        </Button>
      </Box>
    </Center>
  );
};

export default NotFound;
