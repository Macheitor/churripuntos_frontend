import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Stack,
  ModalHeader,
  chakra,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ModalBody,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { Space, User } from "../../hooks/useSpace";
import { FieldValues, useForm } from "react-hook-form";
import userService from "../../services/user-service";
import { CanceledError } from "../../services/api-client";
import { FaUserAlt } from "react-icons/fa";
import { CheckIcon } from "@chakra-ui/icons";
import spaceService from "../../services/space-service";

const CFaUserAlt = chakra(FaUserAlt);

interface Props {
  children: ReactNode;
  space: Space;
  onUserAdded: (user: User) => void;
}

const ModalAddUser = ({ children, space, onUserAdded }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { register, handleSubmit, reset, setValue } = useForm();
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [usersFound, setUsersFound] = useState<User[]>([]);
  const [acceptBtn, setAcceptBtn] = useState(false);

  const getAllUsers = () => {
    const { request, cancel } = userService.getAllUsers();
    request
      .then((res) => {
        setAllUsers(res.data.users);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
        setAllUsers([]);
      });
    return () => cancel();
  };

  const onAddUser = (user: User) => {
    spaceService
      .addUser(space, user)
      .then((res) => {
        onUserAdded(res.data.user);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
  };

  const onCloseModal = () => {
    onClose();
    setAllUsers([]);
    setShowCheckIcon(false);
    setUsersFound([]);
    reset();
  };

  const onSubmit = (data: FieldValues) => {
    onAddUser(data.user);
    onCloseModal();
  };

  return (
    <>
      <div
        onClick={() => {
          onOpen();
          getAllUsers();
        }}
      >
        {children}
      </div>

      <Modal isOpen={isOpen} onClose={onCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add user</ModalHeader>
          <ModalBody>
            <Stack spacing={4} p={1}>
              <form id="formAddUser" onSubmit={handleSubmit(onSubmit)}>
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
                        const username = e.target.value;
                        setValue("username", username);

                        if (username.length >= 3) {
                          setUsersFound(
                            allUsers.filter((user) => {
                              return user.username
                                .toLowerCase()
                                .startsWith(username.toLowerCase());
                            })
                          );
                        } else {
                          setUsersFound([]);
                        }

                        const userFound = allUsers.find(
                          (u) =>
                            u.username.toLowerCase() === username.toLowerCase()
                        );

                        if (userFound) {
                          setValue("user", userFound);
                          setAcceptBtn(true);
                          setShowCheckIcon(true);
                        } else {
                          setValue("user", null);
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
              </form>
              {usersFound.map((user) => (
                <p
                  key={user._id}
                  onClick={() => {
                    setValue("username", user.username);
                    setAcceptBtn(true);
                    setShowCheckIcon(true);
                    setUsersFound([]);
                  }}
                >
                  {user.username}
                </p>
              ))}
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onCloseModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="formAddUser"
              isDisabled={!acceptBtn}
              colorScheme="blue"
            >
              Add user
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddUser;
