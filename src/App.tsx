import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect } from "react";
import apiClient from "./services/api-client";
import { CanceledError } from "axios";
import SpacesGrid from "./components/SpacesGrid";
import Space from "./components/Space";
import { Text } from "@chakra-ui/react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const user = {
      username: localStorage.getItem("username"),
      userId: localStorage.getItem("userId"),
    };

    apiClient
      .post("/verifySession", user, {
        signal: controller.signal,
      })
      .then(() => {
        if (["/", "/login", "/register"].includes(location.pathname)) {
          navigate("/spaces", { replace: true });
        }
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        if (!["/", "/login", "/register"].includes(location.pathname)) {
          navigate("/login", { replace: true });
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/spaces" element={<SpacesGrid />} />
        <Route path="/spaces/:spaceId" element={<Space />} />
        <Route path="*" element={<Text>404 PAGE NOT</Text>} />
      </Routes>
    </>
  );

  /*




  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        // lg: `"nav nav nav" "aside main section"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      // <Show above="lg">
      //   <GridItem area="aside">aside</GridItem>
      // </Show>

      <Center>
        <GridItem area="main" width={700}>
          <SpacesGrid />
        </GridItem>
      </Center>
    </Grid>
  );
  */
}

export default App;
