import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import BoardNavBar from "./BoardNavBar";

const Board = () => {
  return (
    <>
      <Grid
        templateAreas={{
          base: `"nav" "main"`,
        }}
      >
        <GridItem area="nav">
          <BoardNavBar />
        </GridItem>

        <GridItem area="main" width={700}></GridItem>
      </Grid>
    </>
  );
};

export default Board;
