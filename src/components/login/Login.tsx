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
  useToast,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CanceledError } from "../../services/api-client";
import loginService, { LoginRequest } from "../../services/login-service";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

  const onSubmit = (data: FieldValues) => {
    const loginRequest: LoginRequest = {
      email: data.email,
      password: data.password,
    };

    loginService
      .login(loginRequest)
      .then(({ data: loginInfo }) => {
        localStorage.setItem("userId", loginInfo.user._id);
        localStorage.setItem("accessToken", loginInfo.user.accessToken);
        navigate("/spaces");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        toast({
          title: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
    // Reset the form inputs no matter what
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
                    {...register("email", {
                      required: true,
                    })}
                    type="text"
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
                    {...register("password", {
                      required: true,
                    })}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>Forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button type="submit" colorScheme="teal">
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Not registered yet?{" "}
        <Link color="teal.500" onClick={() => navigate("/register")}>
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Login;
