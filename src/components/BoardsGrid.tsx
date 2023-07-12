import { Center, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import NavBar from "./NavBar";
import useSpaces from "../hooks/useSpaces";
import BoardCard from "./BoardCard";

const BoardsGrid = () => {
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

      <GridItem area="main">
        {error && <Text>{error}</Text>}
        <SimpleGrid
          columns={{ sm: 1, md: 1, lg: 1, xl: 1 }}
          padding="10px"
          spacing={10}
        >
          {spaces.map((space) => (
            <BoardCard key={space._id} space={space}></BoardCard>
          ))}
        </SimpleGrid>
      </GridItem>
    </Grid>
  );
};

export default BoardsGrid;
