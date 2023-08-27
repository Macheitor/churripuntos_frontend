import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Activity, Space, Task } from "../../hooks/useSpace";
import GenericModal from "../modals/GenericModal";
import spaceService from "../../services/space-service";
import { CanceledError } from "../../services/api-client";
import { FieldValues } from "react-hook-form";

interface Props {
  children: ReactNode;
  space: Space;
  taskSelected: Task;
  currentUserId: string;
  onTaskDeleted: (task: Task) => void;
  onTaskDone: (activity: Activity) => void;
}
const DrawerTasks = ({
  children,
  space,
  taskSelected,
  currentUserId,
  onTaskDeleted,
  onTaskDone,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const taskDone = (data: FieldValues) => {
    const user = space.users.find((user) => user._id === data.userId);

    if (user) {
      spaceService
        .taskDone(space, taskSelected, user)
        .then((res) => {
          onTaskDone(res.data.activity);

          toast({
            title: `Task "${taskSelected.taskname}" done by ${user.username} added.`,
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
  };

  const deleteTask = () => {
    spaceService
      .deleteTask(space, taskSelected)
      .then(() => {
        onTaskDeleted(taskSelected);

        toast({
          title: `Task "${taskSelected.taskname}" deleted.`,
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
  };

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        returnFocusOnClose={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Stack align={"center"}>
              <GenericModal
                title={`Who did task "${taskSelected.taskname}" ?`}
                space={space}
                currentUserId={currentUserId}
                userSelector
                dismissBtn="Cancel"
                actionBtn="Task done"
                onAction={(data?: FieldValues) => {
                  data && taskDone(data);
                }}
              >
                <Text>Mark task as done</Text>
              </GenericModal>

              <GenericModal
                title={`Delete task "${taskSelected.taskname}" ?`}
                dismissBtn="Cancel"
                actionBtn="Delete task"
                onAction={deleteTask}
              >
                <Text>Delete task</Text>
              </GenericModal>

              <p onClick={onClose}>Cancel</p>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerTasks;
