import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import spaceService from "../../services/space-service";
import { CanceledError } from "../../services/api-client";
import { useNavigate } from "react-router-dom";
import { Space } from "../../hooks/useSpace";

interface Props {
  children: ReactNode;
  space: Space;
  currentUserId: string;
}

const ModalLeaveSpace = ({ children, space, currentUserId }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();


  const handleLeaveSpace = () => {
    setIsLoading(true);
    spaceService
      .removeUser(space, currentUserId)
      .then(() => {
        setIsLoading(false);
        navigate("/spaces");
        toast({
          title: `You left space "${space.spacename}"`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setIsLoading(false);
        toast({
          title: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
      onClose()
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
          <ModalHeader>{`Are you sure you want to leave space ${space.spacename}?`}</ModalHeader>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              onClick={() => handleLeaveSpace()}
            >
              Leave space
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalLeaveSpace;
