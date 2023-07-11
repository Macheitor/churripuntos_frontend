import { Center, Grid, GridItem, Text } from "@chakra-ui/react";
import NavBar from "./NavBar";
import useSpaces from "../hooks/useSpaces";

const Spaces = () => {
  const { spaces, error } = useSpaces();
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
          {error && <Text>{error}</Text>}
          <ul>
            {spaces.map((space) => (
              <li key={space._id}>{space.spacename}</li>
            ))}
          </ul>
        </GridItem>
      </Center>
    </Grid>
  );
};

export default Spaces;
