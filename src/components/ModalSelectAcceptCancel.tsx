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
import { ReactNode, useState } from "react";

interface Item {
  id: string;
  text: string;
}

interface Props {
  children: ReactNode;
  title: string;
  selectOptions: Item[];
  cancelText?: string;
  acceptText?: string;
  onAccept: (id: string) => void;
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
  const [id, setId] = useState("");

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
              onChange={(e) => {
                setId(e.target.value)
              }}
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
                onAccept(id);
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
