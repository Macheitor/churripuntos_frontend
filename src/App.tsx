import { Center, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import SpacesGrid from "./components/SpacesGrid";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

// Grid breakpoints: base, sm, md, lg, xl

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*<Route path="/spaces" element={<Spaces />} />
        <Route path="/spaces/create" element={<Products />} />
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
