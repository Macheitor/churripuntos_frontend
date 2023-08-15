import {
  Flex,
  Heading,
  Stack,
  Box,
  Link,
  Avatar,
  Text,
  Center,
} from "@chakra-ui/react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CanceledError } from "axios";
import registerService, { RegisterRequest } from "../services/register-service";
import Form from "./Form";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onRegister = (data: FieldValues) => {
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
          <Form
            acceptText="Register"
            emailInput={true}
            usernameInput={true}
            passwordInput={true}
            onAccept={(data: FieldValues) => {
              onRegister(data);
            }}
          />
        </Box>
        <Center>
          {error && (
            <Text as="i" color="red">
              {error}
            </Text>
          )}
        </Center>
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
