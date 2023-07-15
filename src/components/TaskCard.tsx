import { Card, CardBody, Text, HStack } from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";

interface Props {
  taskId: string;
  taskName: string;
  taskPoints: number;
  onDeleteTask: (id: string) => void;
}
const TaskCard = ({ taskName, taskPoints, taskId, onDeleteTask }: Props) => {
  return (
    <Card borderRadius={10}>
      <CardBody>
        <HStack justify={"space-between"}>
          <Text>{taskName}</Text>
          <HStack>
            <Text marginRight={3}>{taskPoints} points</Text>
            <CloseIcon onClick={() => onDeleteTask(taskId)} />
          </HStack>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default TaskCard;
