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

  const deleteTask = (task: Task) => {
    spaceService
      .deleteTask(space, task)
      .then(() => {
        onTaskDeleted();
        onClose();
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
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
          <ModalHeader>Delete task</ModalHeader>

          <ModalBody>
            {`Are you sure you want to delete task "${task.taskname}" from space "${space.spacename}"?`}
          </ModalBody>

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
