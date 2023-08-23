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
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import { Space, User } from "../hooks/useSpace";
import ModalChangeSpacename from "./modals/ModalChangeSpacename";
import ModalDeleteSpace from "./modals/ModalDeleteSpace";

import { ImExit } from "react-icons/im";
import ModalLeaveSpace from "./modals/ModalLeaveSpace";

const CImExit = chakra(ImExit);

interface Props {
  space: Space;
  currentUserId: string;
  onSpacenameChanged: (newSpacename: string) => void;
}
const SpaceNavBar = ({ space, currentUserId, onSpacenameChanged }: Props) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Stack>
        <HStack justify={"space-between"} padding={3}>
          <ChevronLeftIcon boxSize={10} onClick={() => navigate(-1)} />
          <Heading fontSize="xl">{space.spacename}</Heading>
          <HStack>
            <p>{space.users.find(user => user._id === currentUserId)?.username}</p>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />

              <MenuList>
                <ModalChangeSpacename
                  space={space}
                  onSpacenameChanged={(newSpacename) =>
                    onSpacenameChanged(newSpacename)
                  }
                >
                  <MenuItem icon={<EditIcon />}>Change spacename</MenuItem>
                </ModalChangeSpacename>
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
