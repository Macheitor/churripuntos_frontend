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
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CanceledError } from "axios";
import registerService, { RegisterRequest } from "../services/register-service";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: FieldValues) => {
    const registerRequest: RegisterRequest = {
      email: data.email,
      username: data.username,
      password: data.password,
    };

    registerService
      .register(registerRequest)
      .then(() => navigate("/login"))
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.response.data.message);
      });
    reset();
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Churripuntos</Heading>
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
                    {...register("username")}
                    type="text"
                    placeholder="First name"
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<MdEmail color="gray.300" />}
                  />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Email address"
                    required
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
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </InputGroup>
                <Center>
                  {error && (
                    <Text as="i" color="red">
                      {error}
                    </Text>
                  )}
                </Center>
                <FormHelperText textAlign="right">
                  <Link>Forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button type="submit" colorScheme="teal">
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Have an account?{" "}
        <Link color="teal.500" onClick={() => navigate("/login")}>
          Sign in
        </Link>
      </Box>
    </Flex>
  );
};

export default Register;