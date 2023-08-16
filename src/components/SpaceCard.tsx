import { Card, CardBody, Heading, Text, HStack } from "@chakra-ui/react";
import { Space } from "./Space"

interface Props {
  space: Space;
  onSelect: (spaceId: string) => void;
}
const SpaceCard = ({ space, onSelect }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      <CardBody onClick={() => onSelect(space._id)}>
        <Heading fontSize="2xl">{space.spacename}</Heading>
      </CardBody>
    </Card>
  );
};

export default SpaceCard;
