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
import ModalDeleteSpace from "./modals/ModalDeleteSpace";
import { ImExit } from "react-icons/im";
import ModalLeaveSpace from "./modals/ModalLeaveSpace";
import ModalChangeUsername from "./modals/ModalChangeUsername";
import GenericModal from "./modals/GenericModal";
import { FieldValues } from "react-hook-form";
import spaceService from "../services/space-service";
import { CanceledError } from "../services/api-client";

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
                <ModalChangeUsername
                  space={space}
                  currentUserId={currentUserId}
                  onUsernameChanged={(userId, newUsername) =>
                    onUsernameChanged(userId, newUsername)
                  }
                >
                  <MenuItem icon={<EditIcon />}>Change username</MenuItem>
                </ModalChangeUsername>

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

                <ModalLeaveSpace space={space} currentUserId={currentUserId}>
                  <MenuItem icon={<CImExit />}>Leave space</MenuItem>
                </ModalLeaveSpace>

                <ModalDeleteSpace space={space}>
                  <MenuItem icon={<DeleteIcon />}>Delete space</MenuItem>
                </ModalDeleteSpace>
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
