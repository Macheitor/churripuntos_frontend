import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect } from "react";
import apiClient from "./services/api-client";
import { CanceledError } from "axios";
import BoardsGrid from "./components/BoardsGrid";

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
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/spaces" element={<BoardsGrid />} />
        {/*<Route path="/spaces/create" element={<Products />} />
        <Route path="/space/{ID}" element={<Products />} />
        <Route path="/space/{ID}/members" element={<Products />} />
        <Route path="/space/{ID}/edit" element={<Products />} />
        <Route path="/space/{ID}/ranking" element={<Products />} />
        <Route path="/space/{ID}/tasks" element={<Products />} />
        <Route path="/space/{ID}/tasks/add" element={<Products />} />
        <Route path="/space/{ID}/summary" element={<Products />} /> */}
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
