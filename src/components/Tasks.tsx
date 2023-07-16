import { Task, User } from "./Space";
import {
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Heading,
  Stack,
  useDisclosure,
  HStack,
  Input,
  Card,
  CardBody,
  Text,
  FormControl,
  InputGroup,
  InputLeftElement,
  chakra,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { FieldValues, useForm } from "react-hook-form";

import { FaUserAlt, FaLock } from "react-icons/fa";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface Props {
  tasks: Task[];
  users: User[];
  onUpdateSpace: () => void;
}

interface FormInput {
  taskname: string;
  points: number;
}
const Tasks = ({ tasks, onUpdateSpace }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const btnRef = useRef(null);
  const [drawerType, setDrawerType] = useState("");

  const { register, handleSubmit, reset } = useForm<FormInput>();

  const [deleteTaskId, setDeleteTaskId] = useState("");

  // Create task
  const onSubmit = (task: FieldValues) => {
    setIsLoading(true);
    apiClient
      .post(`/spaces/${localStorage.getItem("currentSpaceId")}/tasks`, task)
      .then(() => {
        onClose();
        onUpdateSpace();
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setIsLoading(false);
        setError(err.response.data.message);
      });
    reset();
  };

  // Delete task
  const deleteTask = (taskId: string) => {
    apiClient
      .delete(
        `/spaces/${localStorage.getItem("currentSpaceId")}/tasks/${taskId}`
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
  };

  return (
    <>
      <Center>
        <Heading size={"lg"}>TASKS LIST</Heading>
      </Center>

      <HStack justify={"right"}>
        <Button
          ref={btnRef}
          colorScheme="blue"
          onClick={() => {
            setDrawerType("createTask");
            onOpen();
          }}
        >
          Create task
        </Button>
      </HStack>

      {tasks.map((task) => (
        <Card key={task._id}>
          <CardBody>
            <HStack justify={"space-between"}>
              <Text>{task.taskname}</Text>
              <Text marginRight={3}>{task.points} points</Text>
              <CloseIcon
                onClick={() => {
                  setDrawerType("deleteTask");
                  setDeleteTaskId(task._id);
                  onOpen();
                }}
              />
            </HStack>
          </CardBody>
        </Card>
      ))}

      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={() => {
          reset();
          onClose();
        }}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        {drawerType === "createTask" && (
          <DrawerContent>
            <DrawerHeader>Create new task</DrawerHeader>

            <DrawerBody>
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
            </DrawerBody>

            <DrawerFooter>
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
            </DrawerFooter>
          </DrawerContent>
        )}
        {drawerType === "deleteTask" && (
          <DrawerContent>
            <DrawerHeader>Delete this task?</DrawerHeader>

            <DrawerBody></DrawerBody>

            <DrawerFooter>
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
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>
    </>
  );
};

export default Tasks;
