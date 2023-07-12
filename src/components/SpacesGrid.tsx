import { Center, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import NavBar from "./NavBar";
import useSpaces from "../hooks/useSpaces";
import SpaceCard from "./SpaceCard";
import { useNavigate } from "react-router-dom";

const SpacesGrid = () => {
  const { spaces, error } = useSpaces(); // TODO: Get only necessary data of spaces, not all of them!
  const navigate = useNavigate();

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
          <SimpleGrid
            columns={{ sm: 1, md: 1, lg: 1, xl: 1 }}
            padding="10px"
            spacing={10}
          >
            {spaces.map((space) => (
              <SpaceCard
                key={space._id}
                space={space}
                onSelect={(spaceId) => navigate(`/spaces/${spaceId}`)}
              ></SpaceCard>
            ))}
          </SimpleGrid>
        </GridItem>
      </Center>
    </Grid>
  );
};

export default SpacesGrid;
