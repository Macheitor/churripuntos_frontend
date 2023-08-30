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
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CanceledError } from "axios";
import registerService, { RegisterRequest } from "../services/register-service";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

  const onSubmit = (data: FieldValues) => {
    const registerRequest: RegisterRequest = {
      email: data.email,
      username: data.username,
      password: data.password,
    };

    registerService
      .register(registerRequest)
      .then(() => {
        navigate("/login");
        toast({
          title: `Register successful`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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
                    {...register("username", {
                      required: true,
                      maxLength: 12,
                    })}
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
                    {...register("email", {
                      required: true,
                    })}
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
                    {...register("password", {
                      required: true,
                    })}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </InputGroup>
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
