import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Select,
  useToast,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { Activity, Space, Task, User } from "../../hooks/useSpace";
import { CanceledError } from "../../services/api-client";
import spaceService from "../../services/space-service";

interface Props {
  children: ReactNode;
  space: Space;
  task: Task;
  currentUserId: string;
  onTaskDone: (activity: Activity) => void;
}

const ModalTaskDone = ({
  children,
  space,
  task,
  currentUserId,
  onTaskDone,
}: Props) => {
  const users = space.users;

  const { onOpen, onClose, isOpen } = useDisclosure();
  const [userIdSelected, setUserIdSelected] = useState(currentUserId);
  const toast = useToast();

  const onSubmit = () => {
    const user = users.find((user) => user._id === userIdSelected);

    if (user) {
      spaceService
        .taskDone(space, task, user)
        .then((res) => {
          onTaskDone(res.data.activity);
          setUserIdSelected(currentUserId);

          toast({
            title: `"${task.taskname}" done by ${user.username} added.`,
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
    } else {
      toast({
        title: "user not found",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setUserIdSelected(currentUserId);
    onClose();
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
          <ModalHeader>Who did task "{task.taskname}"?</ModalHeader>
          <ModalBody>
            <Select
              value={userIdSelected}
              onChange={(choice) => {
                setUserIdSelected(choice.target.value);
              }}
            >
              {users
                .filter((u) => !u.isDeleted)
                .map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onSubmit}>
              Task done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalTaskDone;
