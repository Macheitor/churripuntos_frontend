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
  title: string;
  cancelText?: string;
  acceptText?: string;
  onAccept: () => void;
}

const ModalAcceptCancel = ({
  children,
  title,
  cancelText = "Cancel",
  acceptText = "Accept",
  onAccept,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>{title}</ModalHeader>

          <ModalBody></ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={() => {
                onClose();
              }}
            >
              {cancelText}
            </Button>
            <Button
              onClick={() => {
                onAccept();
                onClose();
              }}
              colorScheme="red"
            >
              {acceptText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAcceptCancel;
