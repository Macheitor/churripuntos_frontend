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

interface Props {
  children: ReactNode;
  username: string;
  onAccept: () => void;
}

const ModalKickOutUser = ({ children, username, onAccept }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Delete user</ModalHeader>

          <ModalBody>
            {`Are you sure you want to kick out ${username}?`}
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
                onAccept();
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
