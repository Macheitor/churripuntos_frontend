import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  selectOptions: [{id: string, text: string}];
  cancelText?: string;
  acceptText?: string;
  onAccept: () => void;
}

const ModalAcceptCancel = ({
  children,
  title,
  selectOptions,
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

          <ModalBody>
            <Select
              placeholder="Select user"
            >
              {selectOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.text}
                </option>
              ))}
            </Select>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
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
