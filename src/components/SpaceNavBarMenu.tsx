import { HamburgerIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import ModalDeleteSpace from "./modals/ModalDeleteSpace";
import { Space } from "../hooks/useSpace";

interface Props {
  space: Space;
}

const SpaceNavBarMenu = ({ space }: Props) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <ModalDeleteSpace space={space}>
          <MenuItem icon={<DeleteIcon />}>Delete space</MenuItem>
        </ModalDeleteSpace>
      </MenuList>
    </Menu>
  );
};

export default SpaceNavBarMenu;
