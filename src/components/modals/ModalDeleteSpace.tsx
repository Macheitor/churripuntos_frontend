import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalBody,
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
}

const ModalAddUser = ({ children, space }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const navigate = useNavigate();

  const handleDeleteSpace = () => {
    setIsLoading(true);
    spaceService
      .delete(space._id)
      .then(() => {
        setIsLoading(false);
        navigate("/spaces");
        toast({
          title: `Space "${space.spacename}" deleted.`,
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
    onClose();
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
          <ModalHeader>Delete space</ModalHeader>

          <ModalBody>
            <p>{`Are you sure you want to delete space ${space.spacename}?`}</p>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              onClick={() => handleDeleteSpace()}
            >
              Delete space
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAddUser;
