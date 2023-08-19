import { Button, Center, Heading, HStack, Text, Box } from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

import { Activity, Space, Task } from "../hooks/useSpace";
import ModalCreateTask from "./modals/ModalCreateTask";
import ModalDeleteTask from "./modals/ModalDeleteTask";
import ModalTaskDone from "./modals/ModalTaskDone";

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

  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [deleteBtn, setDeleteBtn] = useState("Delete");

  const toggleDeleteBtn = () => {
    if (deleteBtn === "Delete") {
      setShowDeleteIcon(true);
      setDeleteBtn("Cancel");
    } else {
      setShowDeleteIcon(false);
      setDeleteBtn("Delete");
    }
  };

  return (
    <>
      <Center>
        <Heading size={"lg"}>TASKS LIST</Heading>
      </Center>

      {tasks.map((task) => (
        <HStack>
          <Box
            w={"100%"}
            p={1}
            m={1}
            key={task._id}
            bg={"gray.700"}
            borderRadius={10}
          >
            <ModalTaskDone
              space={space}
              task={task}
              currentUserId={currentUserId}
              onTaskDone={(activity) => onTaskDone(activity)}
              key={task._id}
            >
              <HStack
                justify={"space-between"}
                onClick={() => {
                  setShowDeleteIcon(false);
                  setDeleteBtn("Delete");
                }}
              >
                <Text>{task.taskname}</Text>
                <Text marginRight={3}>{task.points} points</Text>
              </HStack>
            </ModalTaskDone>
          </Box>
          {showDeleteIcon && (
            <ModalDeleteTask
              space={space}
              task={task}
              onTaskDeleted={() => onTaskDeleted(task)}
            >
              <DeleteIcon color="red" />
            </ModalDeleteTask>
          )}
        </HStack>
      ))}

      <HStack justify={"right"} p={1}>
        <ModalCreateTask
          space={space}
          onTaskCreated={(task) => onTaskCreated(task)}
        >
          <Button
            colorScheme="blue"
            onClick={() => {
              setShowDeleteIcon(false);
              setDeleteBtn("Delete");
            }}
          >
            Create task
          </Button>
        </ModalCreateTask>

        {tasks.length > 0 && (
          <Button
            variant="outline"
            colorScheme="red"
            onClick={() => {
              toggleDeleteBtn();
            }}
          >
            {deleteBtn}
          </Button>
        )}
      </HStack>
    </>
  );
};

export default Tasks;
