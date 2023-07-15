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

interface Props {
  tasks: Task[];
  onAddTask: () => void;
  onDeleteTask: (id: string) => void;
}
const Tasks = ({ tasks, onAddTask, onDeleteTask }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <Stack>
        <Center>
          <Heading size={"lg"}>TASKS</Heading>
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
              onDeleteTask={(taskId) => onDeleteTask(taskId)}
            />
          ))}
      </Stack>
    </>
  );
};

export default Tasks;
