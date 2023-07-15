import { Task } from "./Space";
import TaskCard from "./TaskCard";
import {
  Button,
  Center,
  HStack,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import TaskAdd from "./TaskAdd";
import FocusLock from "react-focus-lock";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface Props {
  tasks: Task[];
  onAddTask: () => void;
  onUpdateSpace: () => void;
}
const Tasks = ({ tasks, onAddTask, onUpdateSpace }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [deleteTaskId, setDeleteTaskId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (deleteTaskId) {
      apiClient
        .delete(
          `/spaces/${localStorage.getItem(
            "currentSpaceId"
          )}/tasks/${deleteTaskId}`
        )
        .then(() => {
          onUpdateSpace();
          setDeleteTaskId("");
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.response.data.message);
          setDeleteTaskId("");
        });
    }
  }, [deleteTaskId]);

  return (
    <>
      <Stack>
        <Center>
          <Heading size={"lg"}>TASKS LIST</Heading>
        </Center>

        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          placement="bottom"
          closeOnBlur={false}
        >
          <PopoverTrigger>
            <HStack justify={"right"}>
              <Button isDisabled={isOpen}>Add task</Button>
            </HStack>
          </PopoverTrigger>
          <PopoverContent>
            <FocusLock returnFocus persistentFocus={false}>
              <PopoverArrow />
              <PopoverBody>
                <TaskAdd onClose={onClose} onAddTask={onAddTask} />
              </PopoverBody>
            </FocusLock>
          </PopoverContent>
        </Popover>

        {!isOpen &&
          tasks.map((task) => (
            <TaskCard
              taskName={task.taskname}
              taskPoints={task.points}
              taskId={task._id}
              key={task._id}
              onDeleteTask={(taskId) => setDeleteTaskId(taskId)}
            />
          ))}
      </Stack>
    </>
  );
};

export default Tasks;
