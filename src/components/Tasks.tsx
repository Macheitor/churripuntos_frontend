import { Button, Center, Heading, HStack, Text, Box } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

import { Activity, Space, Task } from "../hooks/useSpace";
import ModalCreateTask from "./modals/ModalCreateTask";
import DrawerTasks from "./drawers/DrawerTasks";

interface Props {
  space: Space;
  currentUserId: string;
  onTaskCreated: (task: Task) => void;
  onTaskDeleted: (task: Task) => void;
  onTaskDone: (activity: Activity) => void;
}

const Tasks = ({
  space,
  currentUserId,
  onTaskCreated,
  onTaskDeleted,
  onTaskDone,
}: Props) => {
  const tasks = space.tasks;

  return (
    <>
      <Center>
        <Heading size={"lg"}>TASKS LIST</Heading>
      </Center>

      {tasks.map((task) => (
        <HStack key={task._id}>
          <Box w={"100%"} p={1} m={1} bg={"gray.700"} borderRadius={10}>
            <DrawerTasks
              space={space}
              taskSelected={task}
              currentUserId={currentUserId}
              onTaskDeleted={() => onTaskDeleted(task)}
              onTaskDone={(activity) => onTaskDone(activity)}
            >
              <HStack justify={"space-between"}>
                <Text>{task.taskname}</Text>
                <HStack>
                  <Text>{task.points} points</Text>
                  <ChevronRightIcon boxSize={7} />
                </HStack>
              </HStack>
            </DrawerTasks>
          </Box>
        </HStack>
      ))}

      <HStack justify={"right"} p={1}>
        <ModalCreateTask
          space={space}
          onTaskCreated={(task) => onTaskCreated(task)}
        >
          <Button colorScheme="blue">Create task</Button>
        </ModalCreateTask>
      </HStack>
    </>
  );
};

export default Tasks;
