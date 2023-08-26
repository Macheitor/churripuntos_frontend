import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalHeader,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Space, User } from "../../hooks/useSpace";
import { CanceledError } from "../../services/api-client";
import spaceService from "../../services/space-service";

interface Props {
  children: ReactNode;
  space: Space;
  user: User;
  onAdminDowngraded: () => void;
}

const ModalAdminUpgrade = ({
  children,
  space,
  user,
  onAdminDowngraded,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const adminDowngrade = () => {
    spaceService
      .removeAdmin(space, user._id)
      .then(() => {
        onAdminDowngraded();
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
  };

  return (
    <>
      <div
        onClick={() => {
          onOpen();
        }}
      >
        {children}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        returnFocusOnClose={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to downgrade "{user.username}" from admin?
          </ModalHeader>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={adminDowngrade}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalAdminUpgrade;
