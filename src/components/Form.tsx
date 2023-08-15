import {
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  chakra,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface Props {
  acceptText: string;
  cancelBtn?: boolean;
  cancelText?: string;
  emailInput?: boolean;
  genericInput?: boolean;
  passwordInput?: boolean;
  selectInput?: boolean;
  usernameInput?: boolean;

  onAccept: (data:FieldValues) => void;
  onCancel?: () => void;
}

const Form = ({
  acceptText = "",
  cancelBtn = false,
  cancelText = "",
  emailInput = false,
  genericInput = false,
  passwordInput = false,
  selectInput = false,
  usernameInput = false,
  onAccept,
  onCancel,
}: Props) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data: FieldValues) => {
    onAccept(data);
    reset();
  };
  return (
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} p="1rem" boxShadow="md">
          {usernameInput && (
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  {...register("username")}
                  type="text"
                  placeholder="Username"
                />
              </InputGroup>
            </FormControl>
          )}
          {emailInput && (
            <FormControl isRequired>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<MdEmail color="gray.300" />}
                />
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Email address"
                />
              </InputGroup>
            </FormControl>
          )}
          {passwordInput && (
            <FormControl isRequired>
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
                />
              </InputGroup>
            </FormControl>
          )}
          {cancelBtn && (
            <FormControl>
              <Button type="reset" variant="outline" mr={3} onClick={onCancel}>
                {cancelText}
              </Button>
            </FormControl>
          )}
          <FormControl>
            <Button type="submit" colorScheme="teal" w={"100%"}>
              {acceptText}
            </Button>
          </FormControl>
        </Stack>
      </form>
  );
};

export default Form;
