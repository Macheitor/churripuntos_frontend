import { Center, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import NavBar from "./NavBar";
import useUserSpaces from "../hooks/useUserSpaces";
import SpaceCard from "./SpaceCard";
import { useNavigate } from "react-router-dom";

const SpacesGrid = () => {
  const { spaces, error } = useUserSpaces(); // TODO: Get only necessary data of spaces, not all of them!
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
        <GridItem area="main">
          {error && <Text>{error}</Text>}
          <SimpleGrid
            padding="10px"
            spacing={10}
          >
            {spaces.map((space) => (
              <SpaceCard
                key={space._id}
                space={space}
                onSelect={(spaceId) => {
                  localStorage.setItem("currentSpaceId", spaceId);
                  navigate(`/spaces/${spaceId}`);
                }}
              ></SpaceCard>
            ))}
          </SimpleGrid>
        </GridItem>
      </Center>
    </Grid>
  );
};

export default SpacesGrid;
