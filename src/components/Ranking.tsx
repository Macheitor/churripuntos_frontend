import RankingCard from "./RankingCard";
import { Center, Heading } from "@chakra-ui/react";

const Ranking = () => {
  return (
    <>
      <Center>
        <Heading size={"lg"}>RANKING</Heading>
      </Center>
      <RankingCard position={1} username="Victor" points={100} />
      <RankingCard position={2} username="Pau" points={100} />
    </>
  );
};

export default Ranking;
