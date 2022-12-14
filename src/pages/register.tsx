import { useCallback } from "react";
import {
  Heading,
  Center,
  FormControl,
  FormLabel,
  Text,
  Input,
  Button,
  Box,
  Flex,
  VStack,
  ScaleFade,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { RegisterValues } from "../interfaces";
import { REGISTER } from "../api/user";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Page from "../components/page";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const toast = useToast();

  const [registerUser] = useMutation(REGISTER, {
    onCompleted: () => {
      toast({
        title: "Succes",
        description: "Account aangemaakt. Je kan nu inloggen.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      navigate("/login");
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

  const handleRegister = useCallback(
    async (formData: RegisterValues) => {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Fout",
          description: "Wachtwoord en herhaal wachtwoord komen niet overeen!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      registerUser({ variables: { username: formData.username, password: formData.password } });
    },
    [registerUser, toast]
  );

  return (
    <Page>
      <ScaleFade in={true} initialScale={0.9}>
        <form onSubmit={handleSubmit(handleRegister)}>
          <Center height="100vh">
            <Box maxW="550px" p="2rem" borderRadius="16px" boxShadow="0px 5px 10px hsl(185, 85%, 35%)" width="85%">
              <Flex>
                <Heading>Registreren</Heading>
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
                    {...register("password", {
                      minLength: { value: 8, message: "Wachtwoord moet minstens 8 karakters bevatten" },
                    })}
                  />
                  {errors.password && (
                    <Text my="1rem" color="red">
                      {/* @ts-ignore */}
                      {errors.password.message}
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Herhaal wachtwoord</FormLabel>
                  <Input
                    type="password"
                    variant="filled"
                    placeholder="********"
                    {...register("confirmPassword", { required: "Herhaal wachtwoord moet ingevuld zijn" })}
                  />
                  {errors.confirmPassword && (
                    <Text my="1rem" color="red">
                      {/* @ts-ignore */}
                      {errors.confirmPassword.message}
                    </Text>
                  )}
                </FormControl>
              </VStack>
              <Flex justifyContent="space-between" alignItems="center" direction={isSmallerThan600 ? "column" : "row"}>
                <Button
                  leftIcon={<MdOutlineAccountCircle size="20px" />}
                  bgColor="teal.200"
                  type="submit"
                  width={isSmallerThan600 ? "100%" : "60%"}>
                  Account maken
                </Button>
                <Button
                  aria-label="to-login"
                  color="blue"
                  variant="outline"
                  as={RouteLink}
                  to="/login"
                  mt={isSmallerThan600 ? "1rem" : "0"}
                  w={isSmallerThan600 ? "100%" : "60%"}>
                  Ik heb al een account
                </Button>
              </Flex>
            </Box>
          </Center>
        </form>
      </ScaleFade>
    </Page>
  );
};

export default Register;
