import { Card, CardBody, Heading, Text, HStack } from "@chakra-ui/react";
import Score from "./Score";
import { Activity, Space } from "../hooks/useSpace";

interface Props {
  position: number;
  username: string;
  points: number;
}
const RankingCard = ({ position, username, points }: Props) => {
  return (
    <Card borderRadius={10}>
      <CardBody>
        <HStack justify={"space-around"}>
          <Heading fontSize="2xl">{position}</Heading>
          <Text>{username}</Text>
          <Text>{points} points</Text>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default RankingCard;
