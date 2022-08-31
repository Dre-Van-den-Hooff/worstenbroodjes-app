import { TextInput, PasswordInput, Center, Stack, MediaQuery, Paper, Title, Button, Notification } from "@mantine/core";
import { IconUserCircle, IconLock, IconAlertCircle } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { useCallback, useState } from "react";

interface RegisterValues {
  username: string;
  password: string;
  confirmPassword: string;
}

const centerStyle = {
  height: "100vh",
};

const paperStyle = {
  width: "80%",
  maxWidth: "550px",
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

  const handleSubmit = useCallback((values: RegisterValues) => {
    if (values.password !== values.confirmPassword) {
      setNotificationVisible(true);
      return;
    }
    // continue, make connection to api
  }, []);

  return (
    <form onSubmit={onSubmit(values => handleSubmit(values))}>
      <Center sx={centerStyle}>
        <MediaQuery query="(max-width: 600px) and (min-width: 0px)" styles={{ width: "80%" }}>
          <Paper shadow="md" p="xl" sx={paperStyle}>
            <Stack spacing="lg">
              <Title>Registreren</Title>
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
  );
};

export default Register;
