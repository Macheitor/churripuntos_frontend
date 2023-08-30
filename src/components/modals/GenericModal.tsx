import { EditIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Space } from "../../hooks/useSpace";
import { BiSolidBullseye } from "react-icons/bi";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CBiSolidBullseye = chakra(BiSolidBullseye);
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

// TODO: Study this way of doing modal: https://the-guild.dev/blog/coolest-underrated-design-pattern-in-react
interface Props {
  children: ReactNode;
  space?: Space;
  currentUserId?: string;
  title?: string;
  body?: string;
  emailForm?: boolean;
  usernameForm?: boolean;
  userSelector?: boolean;
  tasknameForm?: boolean;
  taskpointsForm?: boolean;
  spacenameForm?: boolean;
  passwordForm?: boolean;
  repasswordForm?: boolean;
  dismissBtn?: string;
  actionBtn?: string;
  onAction: (data?: FieldValues) => void;
}

const GenericModal = ({
  space,
  currentUserId,
  children,
  title,
  body,
  emailForm,
  usernameForm,
  userSelector,
  tasknameForm,
  taskpointsForm,
  spacenameForm,
  passwordForm,
  repasswordForm,
  dismissBtn,
  actionBtn,
  onAction,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const { register, handleSubmit, reset, setValue } = useForm();

  // TODO: Find another way of setting this value
  useEffect(() => {
    setValue("userId", currentUserId);
  }, []);

  const users = space?.users;

  const isFormRequired =
    emailForm ||
    usernameForm ||
    tasknameForm ||
    taskpointsForm ||
    userSelector ||
    spacenameForm;

  const isBodyRequired = body || isFormRequired;

  const onCloseModal = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: FieldValues) => {
    onCloseModal();
    onAction(data);
  };

  // TODO: Find the right way of settings input props
  const genericForm = (name: string) => {
    let icon;
    let type;
    let registerOptions;
    let maxLength = 254;
    switch (name) {
      case "email":
        icon = <EmailIcon color="gray.300" />;
        type = "email";
        break;

      case "username":
        icon = <CFaUserAlt color="gray.300" />;
        type = "text";
        maxLength = 12;
        break;

      case "taskname":
      case "spacename":
        icon = <EditIcon color="gray.300" />;
        type = "text";
        maxLength = 12;
        break;

      case "points":
        icon = <CBiSolidBullseye color="gray.300" />;
        type = "number";
        registerOptions = { valueAsNumber: true };
        break;
        
      case "password":
      case "repassword":
        icon = <CFaLock color="gray.300" />;
        type = "password";
        break;

      default:
        icon = undefined;
        type = undefined;
        registerOptions = undefined;
        maxLength = 254;
    }
    return (
      <FormControl isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={icon} />
          <Input
            {...register(`${name}`, registerOptions)}
            type={type}
            required
            maxLength={maxLength}
            placeholder={name}
          />
        </InputGroup>
      </FormControl>
    );
  };
  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        isCentered
        returnFocusOnClose={false}
      >
        <ModalOverlay />

        <ModalContent>
          {title && <ModalHeader>{title}</ModalHeader>}

          {isBodyRequired && (
            <ModalBody>
              {body && <Text>{body}</Text>}

              {isFormRequired && (
                <form id="genericForm" onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={4} p={1} boxShadow="md">
                    {usernameForm && genericForm("username")}

                    {emailForm && genericForm("email")}

                    {tasknameForm && genericForm("taskname")}

                    {taskpointsForm && genericForm("points")}

                    {spacenameForm && genericForm("spacename")}

                    {passwordForm && genericForm("password")}

                    {repasswordForm && genericForm("repassword")}

                    {userSelector && (
                      <Select {...register("userId")}>
                        {users
                          ?.filter((u) => !u.isDeleted)
                          .map((user) => (
                            <option key={user._id} value={user._id}>
                              {user.username}
                            </option>
                          ))}
                      </Select>
                    )}
                  </Stack>
                </form>
              )}
            </ModalBody>
          )}
          <ModalFooter>
            {dismissBtn && (
              <Button variant="outline" mr={3} onClick={onCloseModal}>
                {dismissBtn}
              </Button>
            )}
            {actionBtn && (
              <Button
                type="submit"
                form="genericForm"
                colorScheme="blue"
                onClick={() => {
                  if (!isFormRequired) {
                    onAction();
                  }
                }}
              >
                {actionBtn}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GenericModal;
