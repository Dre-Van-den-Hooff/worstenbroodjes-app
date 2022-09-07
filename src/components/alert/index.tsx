import { Flex, Alert, AlertIcon, AlertTitle, AlertDescription, Button, type AlertProps } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";

const NotLoggedInAlert = ({ mt, mb, w }: AlertProps) => {
  return (
    <Alert status="error" flexDirection="column" borderRadius="1rem" mt={mt} mb={mb} w={w}>
      <AlertIcon boxSize="25px" mb="1rem" />
      <AlertTitle>Je bent niet ingelogd</AlertTitle>
      <AlertDescription>Log in of maak een account om verder te gaan.</AlertDescription>
      <Flex justifyContent="space-evenly" w="100%" my="2rem">
        <Button as={RouteLink} to="/login" bgColor="blue.200" leftIcon={<FiLogIn />}>
          Inloggen
        </Button>
        <Button as={RouteLink} to="/register" bgColor="blue.200" leftIcon={<MdOutlineAccountCircle />}>
          Registreren
        </Button>
      </Flex>
    </Alert>
  );
};

export default NotLoggedInAlert;
