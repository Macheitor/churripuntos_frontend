import { HamburgerIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

interface Props {
  onDeleteRanking: () => void;
  onDeleteTasks: () => void;
  onDeleteSummary: () => void;
  onDeleteSpace: () => void;
}

const SpaceNavBarMenu = ({
  onDeleteRanking,
  onDeleteTasks,
  onDeleteSummary,
  onDeleteSpace,
}: Props) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<DeleteIcon />} onClick={onDeleteRanking}>
          Delete user
        </MenuItem>
        <MenuItem icon={<DeleteIcon />} onClick={onDeleteTasks}>
          Delete tasks
        </MenuItem>
        <MenuItem icon={<DeleteIcon />} onClick={onDeleteSummary}>
          Delete tasks done
        </MenuItem>
        <MenuItem icon={<DeleteIcon />} onClick={onDeleteSpace}>
          Delete space
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SpaceNavBarMenu;
