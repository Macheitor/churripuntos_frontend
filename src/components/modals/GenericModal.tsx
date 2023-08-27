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
import { FieldValues, RegisterOptions, useForm } from "react-hook-form";
import { Space } from "../../hooks/useSpace";
import { BiSolidBullseye } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";

const CBiSolidBullseye = chakra(BiSolidBullseye);
const CFaUserAlt = chakra(FaUserAlt);

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
    emailForm || usernameForm || tasknameForm || taskpointsForm || userSelector;

  const isBodyRequired = body || isFormRequired;

  const onCloseModal = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: FieldValues) => {
    onCloseModal();
    onAction(data);
  };
  const genericForm = (
    name: string,
    type: string,
    registerParams: RegisterOptions
  ) => {
    let icon;
    switch (name) {
      case "email":
        icon = <EmailIcon color="gray.300" />;
        break;
      case "username":
        icon = <CFaUserAlt color="gray.300" />;
        break;
      case "taskname":
        icon = <EditIcon color="gray.300" />;
        break;
      case "points":
        icon = <CBiSolidBullseye color="gray.300" />;
        break;
      default:
        icon = null;
    }
    return (
      <FormControl isRequired>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={icon} />
          <Input
            {...register(`${name}`, registerParams)}
            type={type}
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
                    {emailForm &&
                      genericForm("email", "email", {
                        required: true,
                      })}

                    {usernameForm &&
                      genericForm("username", "text", {
                        required: true,
                        maxLength: 12,
                      })}

                    {tasknameForm &&
                      genericForm("taskname", "text", {
                        required: true,
                        maxLength: 12,
                      })}

                    {taskpointsForm &&
                      genericForm("points", "number", {
                        required: true,
                        valueAsNumber: true,
                      })}

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
