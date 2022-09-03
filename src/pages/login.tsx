import { useCallback, useState } from "react";
import {
  Heading,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Flex,
  Link,
  Button,
  VStack,
  ScaleFade,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LoginValues } from "../interfaces";
import { LOGIN } from "../api/user";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import Page from "../components/page";

const Login = () => {
  const [loginValues, setLoginValues] = useState<LoginValues>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { data, loading, error }] = useMutation(LOGIN, {
    variables: { username: loginValues?.username, password: loginValues?.password },
    onCompleted: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  const handleLogin = useCallback(
    async (formData: LoginValues) => {
      setLoginValues(formData);
      try {
        await login();
        navigate("/leaderboard");
      } catch (err) {
        // TODO add toasts and loading spinner
      }
    },
    [login, navigate]
  );

  return (
    <Page>
      <ScaleFade in={true} initialScale={0.9}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Center height="100vh">
            <Box maxW="550px" p="2rem" borderRadius="16px" boxShadow="0px 5px 10px hsl(185, 85%, 35%)" width="85%">
              <Flex>
                <Heading>Login</Heading>
              </Flex>
              <VStack spacing="1.5rem" py="1.5rem">
                <FormControl>
                  <FormLabel>Gebruikersnaam</FormLabel>
                  <Input
                    type="text"
                    variant="filled"
                    placeholder="gebruikersnaam"
                    {...register("username", { required: "Gebruikersnaam moet ingevuld zijn" })}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Wachtwoord</FormLabel>
                  <Input
                    type="password"
                    variant="filled"
                    placeholder="********"
                    {...register("password", { required: "Wachtwoord moet ingevuld zijn" })}
                  />
                </FormControl>
              </VStack>
              <Flex justifyContent="space-between" alignItems="center">
                <Button
                  aria-label="login"
                  bgColor="teal.200"
                  leftIcon={<FiLogIn size="20px" />}
                  type="submit"
                  width="60%">
                  Inloggen
                </Button>
                <Link color="blue" as={RouteLink} to="/register">
                  Ik heb nog geen account
                </Link>
              </Flex>
            </Box>
          </Center>
        </form>
      </ScaleFade>
    </Page>
  );
};

export default Login;
