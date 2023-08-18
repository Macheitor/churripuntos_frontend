import {
  Button,
  Center,
  Heading,
  useDisclosure,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Select,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { useForm } from "react-hook-form";

import { Task, User } from "../hooks/useSpace";
import ModalCreateTask from "./modals/ModalCreateTask";

interface Props {
  tasks: Task[];
  users: User[];
  showDeleteIcon: boolean;
  onCreateTask: (task: Task) => void;
  // onTaskDone: (task: Task) => void;
}

interface FormInput {
  taskname: string;
  points: number;
}

interface TaskDone {
  taskId: string;
  userId: string;
}

const Tasks = ({ tasks, users, showDeleteIcon, onCreateTask }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const [modalType, setModalType] = useState("");

  const { reset } = useForm<FormInput>();

  const [deleteTaskId, setDeleteTaskId] = useState("");

  const [taskDone, setTaskDone] = useState<TaskDone>({
    taskId: "",
    userId: "",
  });

  // Delete task
  const deleteTask = (taskId: string) => {
    apiClient
      .delete(
        `/spaces/${localStorage.getItem("currentSpaceId")}/tasks/${taskId}`
      )
      .then(() => {
        setDeleteTaskId("");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
        setDeleteTaskId("");
      });
  };

  // Task done
  const onTaskDoneSubmit = () => {
    setIsLoading(true);
    apiClient
      .post(
        `/spaces/${localStorage.getItem("currentSpaceId")}/activities`,
        taskDone
      )
      .then(() => {
        onClose();
        setIsLoading(false);
        reset();
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setIsLoading(false);
        console.log(err.response.data.message);
        reset();
      });
  };

  return (
    <>
      <Center>
        <Heading size={"lg"}>TASKS LIST</Heading>
      </Center>

      <HStack justify={"right"} p={1}>
        <ModalCreateTask onAccept={(task) => onCreateTask(task)}>
          <Button colorScheme="blue">Create task</Button>
        </ModalCreateTask>
      </HStack>

      {tasks.map((task) => (
        <HStack p={1} key={task._id}>
          <Box
            w="100%"
            bg={"gray.700"}
            borderRadius={10}
            onClick={() => {
              setModalType("taskDone");
              setTaskDone({ ...taskDone, taskId: task._id });
              onOpen();
            }}
          >
            <HStack justify={"space-between"} p={2}>
              <Text>{task.taskname}</Text>
              <Text marginRight={3}>{task.points} points</Text>
            </HStack>
          </Box>

          {showDeleteIcon && (
            <DeleteIcon
              color="red"
              onClick={(e) => {
                setModalType("deleteTask");
                setDeleteTaskId(task._id);
                onOpen();
                e.stopPropagation(); // stops the click from propagating
              }}
            />
          )}
        </HStack>
      ))}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          reset();
          onClose();
        }}
        isCentered
      >
        <ModalOverlay />
        {modalType === "deleteTask" && (
          <ModalContent>
            <ModalHeader>Delete this task?</ModalHeader>

            <ModalBody></ModalBody>

            <ModalFooter>
              <Button
                variant="outline"
                mr={3}
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteTask(deleteTaskId);
                  onClose();
                }}
                colorScheme="red"
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
        {modalType === "taskDone" && (
          <ModalContent>
            <ModalHeader>WHO DID THIS TASK?</ModalHeader>
            <ModalBody>
              <Select
                onChange={(choice) =>
                  setTaskDone({ ...taskDone, userId: choice.target.value })
                }
                placeholder="Select user"
              >
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                mr={3}
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                colorScheme="blue"
                onClick={() => onTaskDoneSubmit()}
              >
                Mark as Done
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};

export default Tasks;
