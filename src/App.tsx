import { ChakraProvider } from "@chakra-ui/react";
import { InMemoryCache, ApolloClient, ApolloProvider } from "@apollo/client";
import theme from "./theme";
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Leaderboard from "./pages/leaderboard";
import Profile from "./pages/profile";
import AuthProvider from "./auth";
import NotFound from "./pages/notFound";

function App() {
  const client = new ApolloClient({ cache: new InMemoryCache(), uri: "http://localhost:4000/graphql" });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Router>
            <Routes>
              <Route element={<Login />} path="/login" />
              <Route element={<Register />} path="/register" />
              <Route element={<Leaderboard />} path="/" />
              <Route element={<Profile />} path="/profile" />
              <Route element={<Leaderboard />} path="/leaderboard" />
              <Route element={<NotFound />} path="*" />
            </Routes>
          </Router>
        </ChakraProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
