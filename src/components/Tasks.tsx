import { Task, User } from "./Space";
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
  users: User[];
  onUpdateSpace: () => void;
}
const Tasks = ({ tasks, users, onUpdateSpace }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

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
              <PopoverBody>
                <TaskAdd
                  onClose={() => {
                    onUpdateSpace();
                    onClose();
                  }}
                />
              </PopoverBody>
            </FocusLock>
          </PopoverContent>
        </Popover>

        {!isOpen &&
          tasks.map((task) => (
            <TaskCard
              users={users}
              taskName={task.taskname}
              taskPoints={task.points}
              taskId={task._id}
              key={task._id}
              onUpdateSpace={() => onUpdateSpace()}
            />
          ))}
      </Stack>
    </>
  );
};

export default Tasks;
