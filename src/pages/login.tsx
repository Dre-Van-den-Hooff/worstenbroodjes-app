import { TextInput, PasswordInput, Center, Stack, MediaQuery, Paper, Title, Button } from "@mantine/core";
import { IconUserCircle, IconLock } from "@tabler/icons";
import { useForm } from "@mantine/form";

const centerStyle = {
  height: "100vh",
};

const paperStyle = {
  width: "80%",
  maxWidth: "550px",
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

  return (
    <form onSubmit={onSubmit(values => console.log(values))}>
      <Center sx={centerStyle}>
        <MediaQuery query="(max-width: 600px) and (min-width: 0px)" styles={{ width: "80%" }}>
          <Paper shadow="md" p="xl" sx={paperStyle}>
            <Stack spacing="lg">
              <Title>Login</Title>
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
  );
};

export default Login;
