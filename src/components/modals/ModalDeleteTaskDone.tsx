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
import { Activity, Space } from "../../hooks/useSpace";
import spaceService from "../../services/space-service";
import { CanceledError } from "../../services/api-client";

interface Props {
  children: ReactNode;
  space: Space;
  taskDone: Activity;
  onTaskDoneDeleted: (taskDone: Activity) => void;
}

const ModalDeleteTaskDone = ({
  children,
  space,
  taskDone,
  onTaskDoneDeleted,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();

  const deleteTaskDone = () => {
    spaceService
      .deleteTaskDone(space, taskDone)
      .then(() => {
        onTaskDoneDeleted(taskDone);
        toast({
          title: `Task "${taskDone.taskname}" done by ${findUsername(
            taskDone.userId
          )} deleted.`,
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
        });
      });
    onClose();
  };

  const findUsername = (userId: string) =>
    space.users.find((u) => u._id === userId)?.username;

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
          <ModalHeader>
            {`Delete "${taskDone.taskname}" done by ${findUsername(
              taskDone.userId
            )}?`}
          </ModalHeader>

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
                deleteTaskDone();
                onClose();
              }}
              colorScheme="red"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDeleteTaskDone;
