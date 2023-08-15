import { EditIcon } from "@chakra-ui/icons";
import {
  Stack,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  chakra,
  HStack,
  Heading,
  Text,
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
  errorMsg?: string;
  genericInput?: boolean;
  genericInputPlaceHolder?: string;
  passwordInput?: boolean;
  selectInput?: boolean;
  title?: string;
  usernameInput?: boolean;

  onAccept: (data: FieldValues) => void;
  onCancel?: () => void;
}

const Form = ({
  acceptText = "",
  cancelBtn = false,
  cancelText = "",
  emailInput = false,
  errorMsg = "",
  genericInput = false,
  genericInputPlaceHolder = "",
  passwordInput = false,
  selectInput = false,
  title = "",
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
      <Heading p={2} size="lg">
        {title}
      </Heading>
      <Stack spacing={4} p={2}>
        {genericInput && (
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<EditIcon color="gray.300" />}
              />
              <Input
                {...register("genericInput")}
                type="text"
                placeholder={genericInputPlaceHolder}
              />
            </InputGroup>
          </FormControl>
        )}
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
        {errorMsg !== "" && <Text color={"red"}>{errorMsg}</Text>}
        <HStack>
          {cancelBtn && (
            <FormControl>
              <Button
                type="reset"
                variant="outline"
                w={"100%"}
                onClick={onCancel}
              >
                {cancelText}
              </Button>
            </FormControl>
          )}
          <FormControl>
            <Button type="submit" colorScheme="teal" w={"100%"}>
              {acceptText}
            </Button>
          </FormControl>
        </HStack>
      </Stack>
    </form>
  );
};

export default Form;
