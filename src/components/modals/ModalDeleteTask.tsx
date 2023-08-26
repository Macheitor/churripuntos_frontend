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
import { CanceledError } from "../../services/api-client";
import { Space, Task } from "../../hooks/useSpace";
import spaceService from "../../services/space-service";

interface Props {
  children: ReactNode;
  space: Space;
  task: Task;
  onTaskDeleted: () => void;
}

const ModalDeleteTask = ({ children, space, task, onTaskDeleted }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const toast = useToast();

  const deleteTask = (task: Task) => {
    spaceService
      .deleteTask(space, task)
      .then(() => {
        onTaskDeleted();
        
        toast({
          title: `Task "${task.taskname}" deleted.`,
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
          <ModalHeader>{`Are you sure you want to delete task "${task.taskname}"?`}</ModalHeader>

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
                deleteTask(task);
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

export default ModalDeleteTask;
