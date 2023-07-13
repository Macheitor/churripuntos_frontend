import { Card, CardBody, Heading, Text, HStack } from "@chakra-ui/react";
import Score from "./Score";
import { Space } from "../hooks/useSpace";

interface Props {
  space: Space;
  onSelect: (spaceId: string) => void;
}
const SpaceCard = ({ space, onSelect }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      {/* <Image src='' */}
      <CardBody onClick={() => onSelect(space._id)}>
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
