import { MantineProvider, Container } from "@mantine/core";
import { theme } from "./theme";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Router>
        <Container sx={{ maxWidth: "1600px" }}>
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
          </Routes>
        </Container>
      </Router>
    </MantineProvider>
  );
}

export default App;
