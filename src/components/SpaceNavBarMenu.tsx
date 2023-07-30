import { HamburgerIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import ModalAcceptCancel from "./ModalAcceptCancel";

interface Props {
  onDeleteSpace: () => void
}

const SpaceNavBarMenu = ({onDeleteSpace}: Props) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <ModalAcceptCancel
          acceptText="Delete space"
          title="Are you sure you want to delete this space?"
          onAccept={onDeleteSpace}
        >
          <MenuItem icon={<DeleteIcon />}>Delete space</MenuItem>
        </ModalAcceptCancel>
      </MenuList>
    </Menu>
  );
};

export default SpaceNavBarMenu;
