import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Activity, Space, Task } from "../../hooks/useSpace";
import ModalTaskDone from "../modals/ModalTaskDone";
import ModalDeleteTask from "../modals/ModalDeleteTask";

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
              <ModalTaskDone
                space={space}
                task={taskSelected}
                currentUserId={currentUserId}
                onTaskDone={(activity) => {
                  onClose();
                  onTaskDone(activity);
                }}
              >
                Mark task as done
              </ModalTaskDone>

              <ModalDeleteTask
                space={space}
                task={taskSelected}
                onTaskDeleted={() => {
                  onClose();
                  onTaskDeleted(taskSelected);
                }}
              >
                Delete task
              </ModalDeleteTask>

              <p onClick={onClose}>Cancel</p>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerTasks;
