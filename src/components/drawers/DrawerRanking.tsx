import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Space, User } from "../../hooks/useSpace";
import spaceService from "../../services/space-service";
import { CanceledError } from "../../services/api-client";
import GenericModal from "../modals/GenericModal";

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
  const toast = useToast();

  const IsCurrentUserAdmin = space.users.find(
    (u) => u._id === currentUserId && u.isAdmin
  );

  const isUserSelectedAdmin = space.users.find(
    (u) => u._id === userSelected._id && u.isAdmin
  );

  const adminDowngrade = () => {
    spaceService
      .removeAdmin(space, userSelected._id)
      .then(() => {
        onAdminDowngraded();
        toast({
          title: `${userSelected.username} removed from admins.`,
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

  const adminUpgrade = () => {
    spaceService
      .makeAdmin(space, userSelected._id)
      .then(() => {
        onAdminUpgraded();
        toast({
          title: `${userSelected.username} added to admins.`,
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

  const removeUser = (user: User) => {
    spaceService
      .removeUser(space, user._id)
      .then(() => {
        onUserRemoved();
        toast({
          title: `${user.username} removed from "${space.spacename}".`,
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
        })
      });
  };

  return (
    <>
      {IsCurrentUserAdmin ? (
        <div onClick={onOpen}>{children}</div>
      ) : (
        <div
          onClick={() =>
            toast({
              title: "You are not admin.",
              description: "Only admins can perform actions on users.",
              status: "warning",
              duration: 3000,
              isClosable: true,
            })
          }
        >
          {children}
        </div>
      )}

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
              {isUserSelectedAdmin ? (
                <p
                  onClick={() => {
                    onClose();
                    adminDowngrade();
                  }}
                >
                  Remove {userSelected.username} from admins
                </p>
              ) : (
                <p
                  onClick={() => {
                    onClose();
                    adminUpgrade();
                  }}
                >
                  Make {userSelected.username} admin
                </p>
              )}

              {IsCurrentUserAdmin && (
                <GenericModal
                  title={`Remove ${userSelected.username} from "${space.spacename}"?`}
                  dismissBtn="Cancel"
                  actionBtn="Remove"
                  onAction={() => removeUser(userSelected)}
                >
                  <p>Remove {userSelected.username}</p>
                </GenericModal>
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
