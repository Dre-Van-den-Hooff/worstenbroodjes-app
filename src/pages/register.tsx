import { useCallback, useState } from "react";
import {
  Heading,
  Center,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Flex,
  Link,
  VStack,
  ScaleFade,
} from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { RegisterValues } from "../interfaces";
import { REGISTER } from "../api/user";
import { useForm } from "react-hook-form";
import Page from "../components/page";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [registerValues, setRegisterValues] = useState<RegisterValues>();

  const [registerUser, { data, loading, error }] = useMutation(REGISTER, {
    variables: { username: registerValues?.username, password: registerValues?.password },
    onCompleted: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  const handleRegister = useCallback(
    async (values: RegisterValues) => {
      if (values.password !== values.confirmPassword) {
        // TODO: handle error
      }
      setRegisterValues(values);
      try {
        registerUser();
        // TODO: add success message and log user in
      } catch (err) {
        // TODO: add alerts and loading spinner
      }
    },
    [registerUser]
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
                <FormControl>
                  <FormLabel>Herhaal wachtwoord</FormLabel>
                  <Input
                    type="password"
                    variant="filled"
                    placeholder="********"
                    {...register("confirmPassword", { required: "Dit veld moet ingevuld zijn" })}
                  />
                </FormControl>
              </VStack>
              <Flex justifyContent="space-between" alignItems="center">
                <Button leftIcon={<MdOutlineAccountCircle size="20px" />} bgColor="teal.200" type="submit" width="60%">
                  Account maken
                </Button>
                <Link color="blue" as={RouteLink} to="/login">
                  Ik heb al een account
                </Link>
              </Flex>
            </Box>
          </Center>
        </form>
      </ScaleFade>
    </Page>
  );
};

export default Register;
