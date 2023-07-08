import { Center, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import SpacesGrid from "./components/SpacesGrid";

// Grid breakpoints: base, sm, md, lg, xl

function App() {
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

      {/* <Show above="lg">
        <GridItem area="aside">aside</GridItem>
      </Show> */}

      <Center>
        <GridItem area="main" width={700}>
          <SpacesGrid />
        </GridItem>
      </Center>
    </Grid>
  );
}

export default App;
