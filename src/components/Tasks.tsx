import {
  Button,
  Center,
  Heading,
  HStack,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Activity, Space, Task } from "../hooks/useSpace";
import DrawerTasks from "./drawers/DrawerTasks";
import GenericModal from "./modals/GenericModal";
import { FieldValues } from "react-hook-form";
import spaceService from "../services/space-service";
import { CanceledError } from "../services/api-client";

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
  const toast = useToast();

  const createTask = (data: FieldValues) => {
    const task: Task = {
      taskname: data.taskname,
      points: data.points,
      _id: "",
    };

    spaceService
      .createTask(space, task)
      .then((res) => {
        onTaskCreated(res.data.task);
        toast({
          title: `Task "${task.taskname}" created.`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        toast({
          title: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Center>
        <Heading size={"lg"}>TASKS LIST</Heading>
      </Center>

      <HStack justify={"right"} p={1}>
        <GenericModal
          title="Create new task"
          tasknameForm
          taskpointsForm
          dismissBtn="Cancel"
          actionBtn="Create"
          onAction={(data?: FieldValues) => {
            data && createTask(data);
          }}
        >
          <Button colorScheme="blue">Create task</Button>
        </GenericModal>
      </HStack>

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
    </>
  );
};

export default Tasks;
