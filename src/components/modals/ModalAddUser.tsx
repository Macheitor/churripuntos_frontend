import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import Form from "../Form";
import { User } from "../../hooks/useSpace";
import { FieldValues } from "react-hook-form";
import userService from "../../services/user-service";
import { CanceledError } from "../../services/api-client";

interface Props {
  children: ReactNode;
  onAccept: (user: User) => void;
}

const ModalAddUser = ({ children, onAccept }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [allUsers, setAllUsers] = useState<User[]>([]);

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

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Stack spacing={4} p={1}>
            <Form
              title="Add user to space"
              acceptText="Add user"
              acceptBtnDefault={false}
              cancelBtn={true}
              cancelText="Cancel"
              usernameInput={true}
              userList={allUsers.map((user) => user.username)}
              onAccept={(data: FieldValues) => {
                // We only have the username from the form data field, search for the actual user
                const user = allUsers.find(
                  (user) => user.username === data.username
                );

                if (user) {
                  onAccept(user);
                  onClose();
                }
              }}
              onCancel={() => onClose()}
            />
          </Stack>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddUser;
