import { useCallback } from "react";
import {
  Heading,
  Center,
  FormControl,
  FormLabel,
  Text,
  Input,
  Box,
  Flex,
  Button,
  VStack,
  ScaleFade,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LoginValues } from "../interfaces";
import { LOGIN } from "../api/user";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import Page from "../components/page";
import { useLogin } from "../auth";

const Login = () => {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loginUser = useLogin();

  const [login] = useMutation(LOGIN, {
    onCompleted: data => {
      loginUser(data.login.user, data.login.token);
      navigate("/leaderboard");
    },
    onError: error => {
      toast({
        title: "Error",
        description: `${error.message}`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const handleLogin = useCallback(
    async (formData: LoginValues) => {
      login({ variables: { username: formData.username, password: formData.password } });
    },
    [login]
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
                  {errors.username && (
                    <Text my="1rem" color="red">
                      {/* @ts-ignore */}
                      {errors.username.message}
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Wachtwoord</FormLabel>
                  <Input
                    type="password"
                    variant="filled"
                    placeholder="********"
                    {...register("password", { required: "Wachtwoord moet ingevuld zijn" })}
                  />
                  {errors.password && (
                    <Text my="1rem" color="red">
                      {/* @ts-ignore */}
                      {errors.password.message}
                    </Text>
                  )}
                </FormControl>
              </VStack>
              <Flex justifyContent="space-between" alignItems="center" direction="column">
                <Button
                  aria-label="login"
                  bgColor="teal.200"
                  leftIcon={<FiLogIn size="20px" />}
                  type="submit"
                  w={isSmallerThan600 ? "100%" : "60%"}>
                  Inloggen
                </Button>
                <Button
                  aria-label="to-register"
                  color="blue"
                  variant="outline"
                  as={RouteLink}
                  to="/register"
                  mt="1rem"
                  w={isSmallerThan600 ? "100%" : "60%"}>
                  Account maken
                </Button>
                <Button
                  aria-label="to-leaderboard"
                  color="blue"
                  variant="outline"
                  as={RouteLink}
                  to="/leaderboard"
                  mt="1rem"
                  w={isSmallerThan600 ? "100%" : "60%"}>
                  Doorgaan zonder in te loggen
                </Button>
              </Flex>
            </Box>
          </Center>
        </form>
      </ScaleFade>
    </Page>
  );
};

export default Login;
