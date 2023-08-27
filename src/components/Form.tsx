import { CheckIcon, EditIcon } from "@chakra-ui/icons";
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
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

interface Props {
  acceptText: string;
  acceptBtnDefault?: boolean;
  cancelBtn?: boolean;
  cancelText?: string;
  emailInput?: boolean;
  errorMsg?: string;
  genericInput?: boolean;
  genericInputPlaceHolder?: string;
  userList?: string[];
  passwordInput?: boolean;
  selectInput?: boolean;
  title?: string;
  usernameInput?: boolean;

  onAccept: (data: FieldValues) => void;
  onCancel?: () => void;
}

const Form = ({
  acceptText = "",
  acceptBtnDefault = true,
  cancelBtn = false,
  cancelText = "",
  emailInput = false,
  errorMsg = "",
  genericInput = false,
  genericInputPlaceHolder = "",
  passwordInput = false,
  selectInput = false,
  userList = [],
  title = "",
  usernameInput = false,
  onAccept,
  onCancel,
}: Props) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [acceptBtn, setAcceptBtn] = useState(acceptBtnDefault);
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [optionsList, setOptionsList] = useState<string[]>([]);

  const onSubmit = (data: FieldValues) => {
    onAccept(data);
    setShowCheckIcon(false);
    setOptionsList([]);
    reset();
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Heading p={2} size="lg">
        {title}
      </Heading>
      <Stack pl={2} pr={2}>
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
                onChange={(e) => {
                  setValue("username", e.target.value);
                  if (e.target.value.length >= 3) {
                    setOptionsList(
                      userList.filter((user) => {
                        return user
                          .toLowerCase()
                          .startsWith(e.target.value.toLowerCase());
                      })
                    );
                  } else {
                    setOptionsList([]);
                  }

                  const found = userList.find(
                    (u) => u.toLowerCase() === e.target.value.toLowerCase()
                  );

                  if (found) {
                    setAcceptBtn(true);
                    setShowCheckIcon(true);
                  } else {
                    setAcceptBtn(false);
                    setShowCheckIcon(false);
                  }
                }}
              />
              {showCheckIcon && (
                <InputRightElement
                  pointerEvents="none"
                  children={<CheckIcon color="green.300" />}
                />
              )}
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
        {optionsList.map((option) => (
          <p
          key={option} // TODO: this should be an id
            onClick={() => {
              setValue("username", option);
              setAcceptBtn(true);
              setShowCheckIcon(true);
              setOptionsList([]);
            }}
          >
            {option}
          </p>
        ))}
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
            <Button
              isDisabled={!acceptBtn}
              type="submit"
              colorScheme="teal"
              w={"100%"}
            >
              {acceptText}
            </Button>
          </FormControl>
        </HStack>
      </Stack>
    </form>
  );
};

export default Form;
