import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  Text,
  Center,
  HStack,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import { Task, User } from "../hooks/useSpace";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface Props {
  onGoBack: () => void;
}

interface FormInput {
  taskname: string;
  points: number;
}

const Login = ({ onGoBack }: Props) => {
  const [error, setError] = useState("");
  const [cancel, setCancel] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<FormInput>();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    // apiClient
    //   .post(`/spaces/${spaceId}/tasks`, {})
    //   .then((res) => {
    //     localStorage.setItem("userId", res.data.user._id);
    //     localStorage.setItem("username", res.data.user.username);
    //     localStorage.setItem("accessToken", res.data.user.accessToken);
    //     navigate("/spaces");
    //   })
    //   .catch((err) => {
    //     if (err instanceof CanceledError) return;
    //     setError(err.response.data.message);
    //   });
    // reset();
  };

  useEffect(() => {
    cancel && onGoBack();
  }, [cancel]);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"

    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} p="1rem" boxShadow="md">
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
                    {...register("points")}
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
                <Button onClick={() => setCancel(true)} colorScheme="teal">
                  Cancel
                </Button>
                <Button type="submit" colorScheme="teal">
                  Save
                </Button>
              </HStack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
