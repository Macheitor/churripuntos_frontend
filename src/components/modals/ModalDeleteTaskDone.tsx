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

  const deleteTaskDone = () => {
    spaceService
      .deleteTaskDone(space, taskDone)
      .then(() => {
        onTaskDoneDeleted(taskDone);
        onClose();
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err.response.data.message);
      });
  };

  const findUsername = (userId: string) =>
    space.users.find((u) => u._id === userId)?.username;

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Delete task</ModalHeader>

          <ModalBody>
            {`Are you sure you want to delete "${
              taskDone.taskname
            }" done by "${findUsername(taskDone.userId)}"?`}
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
