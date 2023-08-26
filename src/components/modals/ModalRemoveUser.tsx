import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { CanceledError } from "../../services/api-client";
import { Space, User } from "../../hooks/useSpace";
import spaceService from "../../services/space-service";

interface Props {
  children: ReactNode;
  space: Space;
  user: User;
  onUserRemoved: () => void;
}

const ModalRemoveUser = ({ children, space, user, onUserRemoved }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();
  
  const kickOutUser = (user: User) => {
    spaceService
      .removeUser(space, user._id)
      .then(() => {
        onUserRemoved();
        toast({
          title: `${user.username} removed from "${space.spacename}".`,
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
        })
      });
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        returnFocusOnClose={false}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{`Remove ${user.username} from "${space.spacename}"?`}</ModalHeader>

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
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalRemoveUser;
