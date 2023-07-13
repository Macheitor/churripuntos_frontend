import { Card, CardBody, Text, HStack } from "@chakra-ui/react";

import { ChevronRightIcon } from "@chakra-ui/icons";

interface Props {
  taskName: string;
  taskPoints: number;
}
const TaskCard = ({ taskName, taskPoints }: Props) => {
  return (
    <Card borderRadius={10}>
      <CardBody>
        <HStack justify={"space-around"}>
          <Text>{taskName}</Text>
          <Text>{taskPoints} points</Text>
          <ChevronRightIcon />
        </HStack>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
