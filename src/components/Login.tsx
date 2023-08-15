import {
  Flex,
  Heading,
  Stack,
  Box,
  Link,
  Avatar,
  Center,
  Text,
} from "@chakra-ui/react";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CanceledError } from "../services/api-client";
import { useState } from "react";
import loginService, { LoginRequest } from "./../services/login-service";
import Form from "./Form";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onLogin = (data: FieldValues) => {
    const loginRequest: LoginRequest = {
      email: data.email,
      password: data.password,
    };

    loginService
      .login(loginRequest)
      .then(({ data: loginInfo }) => {
        localStorage.setItem("userId", loginInfo.user._id);
        localStorage.setItem("username", loginInfo.user.username);
        localStorage.setItem("accessToken", loginInfo.user.accessToken);
        navigate("/spaces");
      })
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
            acceptText="Login"
            emailInput={true}
            passwordInput={true}
            onAccept={(data: FieldValues) => {
              onLogin(data);
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
        <Link>Forgot password?</Link>
        <Box>
          Not registered yet?{" "}
          <Link color="teal.500" onClick={() => navigate("/register")}>
            Sign Up
          </Link>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
