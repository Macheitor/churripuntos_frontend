import { HamburgerIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import ModalDeleteSpace from "./modals/ModalDeleteSpace";

interface Props {
  spaceId: string;
  spacename: string;
  onDeleteRanking: () => void;
  onDeleteTasks: () => void;
  onDeleteSummary: () => void;
}

const SpaceNavBarMenu = ({
  spaceId,
  spacename,
  onDeleteRanking,
  onDeleteTasks,
  onDeleteSummary,
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
          Kick out user
        </MenuItem>
        <MenuItem icon={<DeleteIcon />} onClick={onDeleteTasks}>
          Delete tasks
        </MenuItem>
        <MenuItem icon={<DeleteIcon />} onClick={onDeleteSummary}>
          Delete tasks done
        </MenuItem>
        <ModalDeleteSpace spaceId={spaceId} spacename={spacename}>
          <MenuItem icon={<DeleteIcon />}>Delete space</MenuItem>
        </ModalDeleteSpace>
      </MenuList>
    </Menu>
  );
};

export default SpaceNavBarMenu;
