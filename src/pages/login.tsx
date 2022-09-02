import { useCallback, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { TextInput, Box, PasswordInput, Center, Stack, MediaQuery, Paper, Title, Button } from "@mantine/core";
import { IconUserCircle, IconLock } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { LoginValues } from "../interfaces";
import { LOGIN } from "../api/user";
import Page from "../components/page";

const centerStyle = {
  height: "100vh",
};

const paperStyle = {
  width: "80%",
  maxWidth: "550px",
};

const headingStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
};

const Login = () => {
  const formOptions = {
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value: string) => (value !== "" ? null : "Username moet ingevuld zijn"),
      password: (value: string) => (value !== "" ? null : "Wachtwoord moet ingevuld zijn"),
    },
  };

  const { onSubmit, getInputProps } = useForm(formOptions);

  const [loginValues, setLoginValues] = useState<LoginValues>();
  const [errors, setErrors] = useState(false);

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
    async (values: LoginValues) => {
      setLoginValues(values);
      try {
        await login();
      } catch (err) {
        setErrors(true);
        // TODO add alerts and loading spinner
      }
    },
    [login]
  );

  return (
    <Page>
      <form onSubmit={onSubmit(values => handleLogin(values))}>
        <Center sx={centerStyle}>
          <MediaQuery query="(max-width: 600px) and (min-width: 0px)" styles={{ width: "80%" }}>
            <Paper shadow="md" p="xl" sx={paperStyle}>
              <Stack spacing="lg">
                <Box sx={headingStyle}>
                  <Title>Login</Title>
                  <Button compact variant="outline" component={RouteLink} to="/register">
                    Nog geen account? Registreer hier!
                  </Button>
                </Box>
                <Stack spacing="lg">
                  <TextInput
                    placeholder="gebruikersnaam"
                    label="Gebruikersnaam"
                    required
                    icon={<IconUserCircle size={14} />}
                    {...getInputProps("username")}
                  />
                  <PasswordInput
                    label="Wachtwoord"
                    placeholder="********"
                    required
                    icon={<IconLock size={14} />}
                    {...getInputProps("password")}
                  />
                </Stack>
                <Button type="submit">Log in</Button>
              </Stack>
            </Paper>
          </MediaQuery>
        </Center>
      </form>
    </Page>
  );
};

export default Login;
