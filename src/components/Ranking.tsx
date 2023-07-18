import { Box, Center, Grid, HStack, Heading, Text } from "@chakra-ui/react";
import { Activity } from "./Space";
import RankingCard from "./RankingCard";

interface Props {
  tasksDone: Activity[];
}

interface Rank {
  username: string;
  points: number;
  userId: string;
}

const Ranking = ({ tasksDone }: Props) => {
  const buildRanking = (arr: Activity[]) => {
    return arr.reduce((acc: Rank[], val) => {
      const index = acc.findIndex((obj) => obj.userId === val.userId);
      if (index !== -1) {
        acc[index].points += val.points;
      } else {
        acc.push({
          username: val.username,
          points: val.points,
          userId: val.userId,
        });
      }
      return acc;
    }, []);
  };

  const ranking = buildRanking(tasksDone).sort((a, b) => b.points - a.points);

  return (
    <>
      <Center>
        <Heading size={"lg"}>RANKING</Heading>
      </Center>

      {ranking.map((r, index) => (
        <RankingCard
          position={index + 1}
          username={r.username}
          points={r.points}
          key={r.userId}
        />

        // <Box w="100%" bg={"gray.700"} borderRadius={10} key={r.userId}>
        //   <HStack justify={"space-around"} p={2}>
        //     <Box bg={"yellow"}>TODO: position</Box>
        //     <Box>{r.points} points</Box>
        //     <Box>{r.username}</Box>
        //   </HStack>

        //   {/* <Grid templateColumns="repeat(3, 1fr)">
        //     <Box bg={"yellow"}>TODO: position</Box>
        //     <Box>{r.points} points</Box>
        //     <Box>{r.username}</Box>
        //     </Grid> */}

        // </Box>
      ))}
    </>
  );
};

export default Ranking;
