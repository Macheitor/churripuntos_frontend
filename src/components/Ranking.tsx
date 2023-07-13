import React from "react";
import RankingCard from "./RankingCard";
import { Heading, SimpleGrid } from "@chakra-ui/react";

const Ranking = () => {
  return (
    <SimpleGrid spacing={1}>
      <Heading size={"lg"}>RANKING</Heading>
      <RankingCard position={1} username="Victor" points={100} />
      <RankingCard position={2} username="Pau" points={100} />
    </SimpleGrid>
  );
};

export default Ranking;
