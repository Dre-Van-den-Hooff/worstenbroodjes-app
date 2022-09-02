import { MantineProvider } from "@mantine/core";
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import { theme } from "./theme";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Leaderboard from "./pages/leaderboard";
import Profile from "./pages/profile";

function App() {
  const client = new ApolloClient({ cache: new InMemoryCache(), uri: "http://localhost:4000/graphql" });

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Leaderboard />} path="/" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<Leaderboard />} path="/leaderboard" />
          </Routes>
        </Router>
      </ApolloProvider>
    </MantineProvider>
  );
}

export default App;
