import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Activity, Space } from "../../hooks/useSpace";
import ModalDeleteTaskDone from "../modals/ModalDeleteTaskDone";

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

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Stack align={"center"}>
              <ModalDeleteTaskDone
                space={space}
                taskDone={taskDoneSelected}
                onTaskDoneDeleted={(taskDone) => {
                  onClose();
                  onTaskDoneDeleted(taskDone);
                }}
              >
                Delete task done
              </ModalDeleteTaskDone>

              <p onClick={onClose}>Cancel</p>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerTasks;
