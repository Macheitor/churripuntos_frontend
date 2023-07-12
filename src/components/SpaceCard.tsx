import { Space } from "../hooks/useSpaces";
import { Card, CardBody, Stack, Heading, Text } from "@chakra-ui/react";

interface Props {
  space: Space;
}
const SpaceCard = ({ space }: Props) => {
  return (
    <Card borderRadius={10} overflow="hidden">
      {/* <Image src='' */}
      <CardBody>
        <Heading fontSize="2xl">{space.spacename}</Heading>
        <Stack color={"gray.400"} fontSize="lg" marginY={2}>
          {space.users.map((u) => (
            <Text key={u._id}>{u.username}</Text>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default SpaceCard;
