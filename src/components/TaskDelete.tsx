import {
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  FormControl,
  Text,
  Center,
  HStack,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import apiClient from "../services/api-client";
import { useState } from "react";
import { CanceledError } from "axios";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface Props {
  onClose: () => void;
}

interface FormInput {
  taskname: string;
  points: number;
}

const TaskDelete = ({ onClose }: Props) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormInput>();

  const onSubmit = (task: FieldValues) => {
    setIsLoading(true);
    apiClient
      .post(`/spaces/${localStorage.getItem("currentSpaceId")}/tasks`, task)
      .then(() => {
        onClose();
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setIsLoading(false);
        setError(err.response.data.message);
      });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <HStack justify={"space-between"}>
          <Button
            onClick={() => {
              onClose();
              reset();
              setError("");
            }}
            colorScheme="teal"
          >
            Cancel
          </Button>
          <Button isLoading={isLoading} type="submit" colorScheme="teal">
            Save
          </Button>
        </HStack>
      </Stack>
    </form>
  );
};

export default TaskDelete;
