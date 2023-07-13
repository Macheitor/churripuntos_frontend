import { Grid, GridItem, Text } from "@chakra-ui/react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import SpaceNavBar from "./SpaceNavBar";

const SpacesGrid = () => {
  const { spaceId } = useParams();

  console.log("hey");
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
      }}
    >
      <GridItem area="nav">
        <SpaceNavBar spacename="TODO"/>
      </GridItem>

      <GridItem area="main" width={700}>
        <Text>Space id: {spaceId}</Text>
      </GridItem>
    </Grid>
  );
};

export default SpacesGrid;
