import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { CanceledError } from "../../services/api-client";
import { Space, User } from "../../hooks/useSpace";
import spaceService from "../../services/space-service";

interface Props {
  children: ReactNode;
  space: Space;
  user: User;
  onUserKicked: (user: User) => void;
}

const ModalKickOutUser = ({ children, space, user, onUserKicked }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const kickOutUser = (user: User) => {
    spaceService
      .removeUser(space, user)
      .then(() => {
        onUserKicked(user);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Delete user</ModalHeader>

          <ModalBody>
            {`Are you sure you want to kick out ${user.username} from ${space.spacename}?`}
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                kickOutUser(user);
                onClose();
              }}
              colorScheme="red"
            >
              Kick out
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalKickOutUser;
