import { Card, CardBody, Heading, Text, HStack } from "@chakra-ui/react";

interface Props {
  position: number;
  username: string;
  points: number;
}
const RankingCard = ({ position, username, points }: Props) => {
  return (
    <Card borderRadius={10}>
      <CardBody>
        <HStack justify={"space-between"}>
          <HStack>
            <Heading fontSize="2xl">{position}</Heading>
            <Text ml={2}>{username}</Text>
          </HStack>
          <Text>{points} points</Text>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default RankingCard;
