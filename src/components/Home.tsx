import { Center, Grid, GridItem, Text } from "@chakra-ui/react";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <Center>
        <GridItem area="main" width={700}>
          <Text>Home</Text>
        </GridItem>
      </Center>
    </Grid>
  );
};

export default Home;
