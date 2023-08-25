import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Space, User } from "../../hooks/useSpace";
import ModalAdminUpgrade from "../modals/ModalAdminUpgrade";
import ModalAdminDowngrade from "../modals/ModalAdminDowngrade";
import ModalRemoveUser from "../modals/ModalRemoveUser";

interface Props {
  children: ReactNode;
  space: Space;
  userSelected: User;
  currentUserId: string;
  onAdminUpgraded: () => void;
  onAdminDowngraded: () => void;
  onUserRemoved: () => void;
}
const DrawerRanking = ({
  children,
  space,
  userSelected,
  currentUserId,
  onAdminUpgraded,
  onAdminDowngraded,
  onUserRemoved,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const IsCurrentUserAdmin = space.users.find(
    (u) => u._id === currentUserId && u.isAdmin
  );

  const isUserSelectedAdmin = space.users.find(
    (u) => u._id === userSelected._id && u.isAdmin
  );

  return (
    <>
      <div onClick={onOpen}>{children}</div>

      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Stack align={"center"}>
              {!IsCurrentUserAdmin && <p>You are not admin</p>}

              {IsCurrentUserAdmin && isUserSelectedAdmin && (
                <ModalAdminDowngrade
                  space={space}
                  user={userSelected}
                  onAdminDowngraded={() => {
                    onClose();
                    onAdminDowngraded();
                  }}
                >
                  <p>Remove {userSelected.username} from admins</p>
                </ModalAdminDowngrade>
              )}

              {IsCurrentUserAdmin && !isUserSelectedAdmin && (
                <ModalAdminUpgrade
                  space={space}
                  user={userSelected}
                  onAdminUpgraded={() => {
                    onClose();
                    onAdminUpgraded();
                  }}
                >
                  <p>Make {userSelected.username} admin</p>
                </ModalAdminUpgrade>
              )}

              {IsCurrentUserAdmin && (
                <ModalRemoveUser
                  space={space}
                  user={userSelected}
                  onUserRemoved={onUserRemoved}
                >
                  <p>Remove {userSelected.username}</p>
                </ModalRemoveUser>
              )}

              <p onClick={onClose}>Cancel</p>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerRanking;
