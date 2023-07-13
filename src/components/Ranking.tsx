import React from "react";
import RankingCard from "./RankingCard";
import { SimpleGrid } from "@chakra-ui/react";

const Ranking = () => {
  return (
    <SimpleGrid padding={5} spacing={1}>
      <RankingCard position={1} username="Victor" points={100} />
      <RankingCard position={2} username="Pau" points={100} />
    </SimpleGrid>
  );
};

export default Ranking;
