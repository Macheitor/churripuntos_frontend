import { Space } from "../hooks/useSpaces";
import { Card, CardBody, Stack, Heading, Text, HStack } from "@chakra-ui/react";
import Score from "./Score";

interface Props {
  space: Space;
}
const SpaceCard = ({ space }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      {/* <Image src='' */}
      <CardBody>
        <Heading fontSize="2xl">{space.spacename}</Heading>
        {space.users.map((u) => (
          <HStack key={u._id}>
            <Score score={100} />
            <Text color={"gray.400"} fontSize="lg" marginY={2}>
              {u.username}
            </Text>
          </HStack>
        ))}
      </CardBody>
    </Card>
  );
};

export default SpaceCard;
