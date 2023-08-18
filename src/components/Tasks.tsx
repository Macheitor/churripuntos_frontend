import {
  Button,
  Center,
  Heading,
  Stack,
  useDisclosure,
  HStack,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  FormControl,
  InputGroup,
  InputLeftElement,
  chakra,
  Select,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { FieldValues, useForm } from "react-hook-form";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { Task, User } from "../hooks/useSpace";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface Props {
  tasks: Task[];
  users: User[];
  deleteIcons: boolean;
}

interface FormInput {
  taskname: string;
  points: number;
}

interface TaskDone {
  taskId: string;
  userId: string;
}

const Tasks = ({ tasks, users, deleteIcons }: Props) => {


  
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [modalType, setModalType] = useState("");

  const { register, handleSubmit, reset } = useForm<FormInput>();

  const [deleteTaskId, setDeleteTaskId] = useState("");

  const [taskDone, setTaskDone] = useState<TaskDone>({
    taskId: "",
    userId: "",
  });

  // Create task
  const onSubmit = (task: FieldValues) => {
    setIsLoading(true);
    apiClient
      .post(`/spaces/${localStorage.getItem("currentSpaceId")}/tasks`, task)
      .then(() => {
        onClose();
        setIsLoading(false);
        reset();
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setIsLoading(false);
        setError(err.response.data.message);
        reset();
      });
  };

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
        setError(err.response.data.message);
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
        setError(err.response.data.message);
        reset();
      });
  };

  return (
    <>
      <Center>
        <Heading size={"lg"}>TASKS LIST</Heading>
      </Center>

      <HStack justify={"right"} p={1}>
        <Button
          colorScheme="blue"
          onClick={() => {
            setModalType("createTask");
            onOpen();
          }}
        >
          Create task
        </Button>
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

          {deleteIcons && (
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

        {modalType === "createTask" && (
          <ModalContent>
            <ModalHeader>Create new task</ModalHeader>

            <ModalBody>
              <form id="taskAddForm" onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={4} p={1} boxShadow="md">
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<CFaUserAlt color="gray.300" />}
                      />
                      <Input
                        {...register("taskname")}
                        type="text"
                        placeholder="Task name"
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        children={<CFaLock color="gray.300" />}
                      />
                      <Input
                        {...register("points", { valueAsNumber: true })}
                        type="number"
                        placeholder="Points"
                      />
                    </InputGroup>
                    <Center>
                      {error && (
                        <Text as="i" color="red">
                          {error}
                        </Text>
                      )}
                    </Center>
                  </FormControl>
                </Stack>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="outline"
                mr={3}
                onClick={() => {
                  onClose();
                  reset();
                  setError("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="taskAddForm"
                isLoading={isLoading}
                colorScheme="blue"
              >
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
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
                  setError("");
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
                  setError("");
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
