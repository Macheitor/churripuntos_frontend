import {
  Card,
  CardBody,
  Text,
  HStack,
  useDisclosure,
  Popover,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverTrigger,
  PopoverHeader,
  Center,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { User } from "./Space";
import FocusLock from "react-focus-lock";
import TaskDelete from "./TaskDelete";

interface Props {
  users: User[];
  taskId: string;
  taskName: string;
  taskPoints: number;
  onUpdateSpace: () => void;
}
const TaskCard = ({
  users,
  taskName,
  taskPoints,
  taskId,
  onUpdateSpace,
}: Props) => {
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();
  const [taskDone, setTaskDone] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (deleteTask) {
      apiClient
        .delete(
          `/spaces/${localStorage.getItem("currentSpaceId")}/tasks/${taskId}`
        )
        .then(() => {
          onUpdateSpace();
          setDeleteTask(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.response.data.message);
          setDeleteTask(false);
        });
    }
  }, [deleteTask]);

  // useEffect(() => {

  //   if (taskDone) {
  //     apiClient
  //       .delete(
  //         `/spaces/${localStorage.getItem(
  //           "currentSpaceId"
  //         )}/tasks/${taskId}`
  //       )
  //       .then(() => {
  //         onUpdateSpace();
  //         setTaskDone(false);
  //       })
  //       .catch((err) => {
  //         if (err instanceof CanceledError) return;
  //         setError(err.response.data.message);
  //         setTaskDone(false);
  //       });
  //   }
  // }, [taskDone]);

  return (
    <Card
      borderRadius={10}
      onClick={() => {
        onToggle();
      }}
    >
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <CardBody>
            <HStack justify={"space-between"}>
              <Text>{taskName}</Text>
              <Text marginRight={3}>{taskPoints} points</Text>
              <CloseIcon
                onClick={() => {
                  setDeleteTask(true);
                }}
              />
            </HStack>
          </CardBody>
        </PopoverTrigger>
        <PopoverContent>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverHeader fontWeight='semibold'>WHO DID THIS TASK?</PopoverHeader>
            <PopoverBody>
              <TaskDelete onClose={() => console.log("task delete closed")} />
            </PopoverBody>
          </FocusLock>
        </PopoverContent>
      </Popover>
    </Card>
  );
};

export default TaskCard;
