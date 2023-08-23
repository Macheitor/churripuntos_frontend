import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Center,
  Text,
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
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onCloseModal = () => {
    setError(null);
    onClose();
  };

  const handleLeaveSpace = () => {

    setIsLoading(true);
    spaceService
      .removeUser(space, currentUserId)
      .then(() => {
        setIsLoading(false);
        onCloseModal();
        navigate("/spaces");
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setIsLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Leave this space</ModalHeader>

          <ModalBody>
            <p>{`Are you sure you want to leave space ${space.spacename}?`}</p>
            <Center>
              {error && (
                <Text as="i" color="red">
                  {error}
                </Text>
              )}
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onCloseModal}>
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
