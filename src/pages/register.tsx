import { useCallback, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  TextInput,
  PasswordInput,
  Center,
  Stack,
  MediaQuery,
  Paper,
  Title,
  Box,
  Button,
  Notification,
} from "@mantine/core";
import { IconUserCircle, IconLock, IconAlertCircle } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { RegisterValues } from "../interfaces";
import { REGISTER } from "../api/user";
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

const Register = () => {
  const formOptions = {
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },

    validate: {
      username: (value: string) => (value !== "" ? null : "Username moet ingevuld zijn"),
      password: (value: string) => (value !== "" ? null : "Wachtwoord moet ingevuld zijn"),
      confirmPassword: (value: string) => (value !== "" ? null : "Herhaal wachtwoord moet ingevuld zijn"),
    },
  };

  const { onSubmit, getInputProps } = useForm(formOptions);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [registerValues, setRegisterValues] = useState<RegisterValues>();
  const [errors, setErrors] = useState(false);

  const [register, { data, loading, error }] = useMutation(REGISTER, {
    variables: { username: registerValues?.username, password: registerValues?.password },
    onCompleted: data => {
      console.log(data);
    },
    onError: error => {
      console.log(error);
    },
  });

  const handleSubmit = useCallback(
    async (values: RegisterValues) => {
      if (values.password !== values.confirmPassword) {
        setNotificationVisible(true);
        return;
      }
      setRegisterValues(values);
      try {
        register();
        //TODO: add success message and log user in
      } catch (err) {
        setErrors(true);
        // TODO: add alerts and loading spinner
      }
    },
    [register]
  );

  return (
    <Page>
      <form onSubmit={onSubmit(values => handleSubmit(values))}>
        <Center sx={centerStyle}>
          <MediaQuery query="(max-width: 600px) and (min-width: 0px)" styles={{ width: "80%" }}>
            <Paper shadow="md" p="xl" sx={paperStyle}>
              <Stack spacing="lg">
                <Box sx={headingStyle}>
                  <Title>Registreren</Title>
                  <Button compact variant="outline" component={RouteLink} to="/login">
                    Al een account? Log in
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
                    label="Password"
                    required
                    placeholder="********"
                    icon={<IconLock size={14} />}
                    {...getInputProps("password")}
                  />
                  <PasswordInput
                    label="Herhaal wachtwoord"
                    required
                    placeholder="********"
                    icon={<IconLock size={14} />}
                    {...getInputProps("confirmPassword")}
                  />
                </Stack>
                <Button type="submit">Registreren</Button>
                {notificationVisible && (
                  <Notification
                    icon={<IconAlertCircle size={16} />}
                    title="Fout"
                    color="red"
                    onClose={() => setNotificationVisible(false)}>
                    Wachtwoord en herhaal wachtwoord zijn niet hetzelfde!
                  </Notification>
                )}
              </Stack>
            </Paper>
          </MediaQuery>
        </Center>
      </form>
    </Page>
  );
};

export default Register;
