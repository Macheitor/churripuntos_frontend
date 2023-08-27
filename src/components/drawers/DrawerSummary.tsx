import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Stack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Activity, Space } from "../../hooks/useSpace";
import spaceService from "../../services/space-service";
import { CanceledError } from "../../services/api-client";
import GenericModal from "../modals/GenericModal";

interface Props {
  children: ReactNode;
  space: Space;
  taskDoneSelected: Activity;
  onTaskDoneDeleted: (taskDone: Activity) => void;
}
const DrawerTasks = ({
  children,
  space,
  taskDoneSelected,
  onTaskDoneDeleted,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const findUsername = (userId: string) =>
    space.users.find((u) => u._id === userId)?.username;

  const deleteTaskDone = () => {
    spaceService
      .deleteTaskDone(space, taskDoneSelected)
      .then(() => {
        onTaskDoneDeleted(taskDoneSelected);
        toast({
          title: `Task "${taskDoneSelected.taskname}" done by ${findUsername(
            taskDoneSelected.userId
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
                title={`Delete "${
                  taskDoneSelected.taskname
                }" done by ${findUsername(taskDoneSelected.userId)}?`}
                dismissBtn="Cancel"
                actionBtn="Delete"
                onAction={deleteTaskDone}
              >
                <Text>Delete task done</Text>
              </GenericModal>

              <Text onClick={onClose}>Cancel</Text>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerTasks;
