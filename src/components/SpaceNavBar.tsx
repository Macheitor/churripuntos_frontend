import {
  HStack,
  Heading,
  Stack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  chakra,
  useToast,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { Space } from "../hooks/useSpace";
import { ImExit } from "react-icons/im";
import GenericModal from "./modals/GenericModal";
import { FieldValues } from "react-hook-form";
import spaceService from "../services/space-service";
import { CanceledError } from "../services/api-client";
import userService from "../services/user-service";

const CImExit = chakra(ImExit);

interface Props {
  space: Space;
  currentUserId: string;
  onSpacenameChanged: (newSpacename: string) => void;
  onUsernameChanged: (userId: string, newUsername: string) => void;
}
const SpaceNavBar = ({
  space,
  currentUserId,
  onUsernameChanged,
  onSpacenameChanged,
}: Props) => {
  const navigate = useNavigate();
  const toast = useToast();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const changeSpacename = (data: FieldValues) => {
    const newSpacename = data.spacename;

    spaceService
      .changeSpacename(space, newSpacename)
      .then(() => {
        onSpacenameChanged(newSpacename);

        toast({
          title: `Spacename changed.`,
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

  const changeUsername = (data: FieldValues) => {
    const userId = currentUserId;
    const newUsername = data.username;

    userService
      .changeUsername(userId, newUsername)
      .then(() => {
        onUsernameChanged(userId, newUsername);
        toast({
          title: `Username changed`,
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

  const deleteSpace = () => {
    spaceService
      .delete(space._id)
      .then(() => {
        navigate("/spaces");
        toast({
          title: `Space "${space.spacename}" deleted.`,
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

  const leaveSpace = () => {
    spaceService
      .removeUser(space, currentUserId)
      .then(() => {
        navigate("/spaces");
        toast({
          title: `You left space "${space.spacename}"`,
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
      <Stack>
        <HStack justify={"space-between"} padding={3}>
          <ChevronLeftIcon boxSize={10} onClick={() => navigate(-1)} />
          <Heading fontSize="xl">{space.spacename}</Heading>
          <HStack>
            <p>
              {space.users.find((user) => user._id === currentUserId)?.username}
            </p>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />

              <MenuList>
                <GenericModal
                  title="Change username"
                  usernameForm
                  dismissBtn="Cancel"
                  actionBtn="Change username"
                  onAction={(data?: FieldValues) => {
                    data && changeUsername(data);
                  }}
                >
                  <MenuItem icon={<EditIcon />}>Change username</MenuItem>
                </GenericModal>
                <GenericModal
                  title="Change spacename"
                  spacenameForm
                  dismissBtn="Cancel"
                  actionBtn="Change spacename"
                  onAction={(data?: FieldValues) => {
                    data && changeSpacename(data);
                  }}
                >
                  <MenuItem icon={<EditIcon />}>Change spacename</MenuItem>
                </GenericModal>

                <GenericModal
                  title={`Leave space "${space.spacename}" ?`}
                  dismissBtn="Cancel"
                  actionBtn="Leave space"
                  onAction={leaveSpace}
                >
                  <MenuItem icon={<CImExit />}>Leave space</MenuItem>
                </GenericModal>

                <GenericModal
                  title={`Delete space "${space.spacename}" ?`}
                  dismissBtn="Cancel"
                  actionBtn="Delete space"
                  onAction={deleteSpace}
                >
                  <MenuItem icon={<DeleteIcon />}>Delete space</MenuItem>
                </GenericModal>

                <MenuItem icon={<CImExit />} onClick={logout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Stack>
    </>
  );
};

export default SpaceNavBar;
