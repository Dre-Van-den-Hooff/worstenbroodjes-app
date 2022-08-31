import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/login";

function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/login" />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
