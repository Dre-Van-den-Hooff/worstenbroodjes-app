import { MantineProvider, Container } from "@mantine/core";
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import { theme } from "./theme";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  const client = new ApolloClient({ cache: new InMemoryCache(), uri: "http://localhost:4000/graphql" });

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <ApolloProvider client={client}>
        <Router>
          <Container sx={{ maxWidth: "1600px" }}>
            <Routes>
              <Route element={<Login />} path="/login" />
              <Route element={<Register />} path="/register" />
            </Routes>
          </Container>
        </Router>
      </ApolloProvider>
    </MantineProvider>
  );
}

export default App;
