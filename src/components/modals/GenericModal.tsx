import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title?: string;
  body?: string;
  dismissBtn?: string;
  actionBtn?: string;
  onAction: () => void;
}

const GenericModal = ({
  children,
  title,
  body,
  dismissBtn,
  actionBtn,
  onAction,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

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
          {title && <ModalHeader>{title}</ModalHeader>}

          {body && <ModalBody>{body}</ModalBody>}

          <ModalFooter>
            {dismissBtn && (
              <Button variant="outline" mr={3} onClick={onClose}>
                {dismissBtn}
              </Button>
            )}
            {actionBtn && (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  onClose();
                  onAction();
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
